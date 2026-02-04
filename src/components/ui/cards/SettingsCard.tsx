import { ReactElement, useEffect, useState } from "react"
import BaseCard from "./BaseCard"

export type Configuration = {
    key: ReactElement,
    value: ReactElement | null
}

export function configuration_from_text(text_config: [string, string][]): Configuration[] {
    let config: Configuration[] = []

    for (const [ _key, _value ] of text_config) {
        config.push({
            key: <>{ _key }</>,
            value: <>{ _value }</>
        })
    }

    return config
} 

type SettingsCardProps = {
    configuration_name: string,
    configuration_data: Configuration[],
    trimmed_config?: boolean,
    fit_align?: boolean
}

function SettingsCard({ configuration_name, configuration_data, trimmed_config, fit_align = false } : SettingsCardProps) {
    const [hidden_style, set_hidden_style] = useState<{ [key: string]: [string, string] }>({})

    useEffect(() => {
        const n_expandable = configuration_data.filter(e => (e.key.props as any)["data-newline-on-smallscreen"] !== undefined).length

        if (window.innerWidth <= 600) {
            set_hidden_style(prev => ({ ...prev, height: [trimmed_config ? `${40 * (configuration_data.length + n_expandable) + 60}px` : `${60 * (configuration_data.length + n_expandable) + 60}px`, "70px"] }))
        } else {
            set_hidden_style(prev => ({ ...prev, height: [trimmed_config ? `${40 * configuration_data.length + 60}px` : `${60 * configuration_data.length + 60}px`, "70px"] }))
        }
    
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 600) {
                set_hidden_style(prev => ({ ...prev, height: [trimmed_config ? `${40 * (configuration_data.length + n_expandable) + 60}px` : `${60 * (configuration_data.length + n_expandable) + 60}px`, "70px"] }))
            } else {
                set_hidden_style(prev => ({ ...prev, height: [trimmed_config ? `${40 * configuration_data.length + 60}px` : `${60 * configuration_data.length + 60}px`, "70px"] }))
            }
        })
    }, [configuration_data, trimmed_config])
    
    return (
        <BaseCard 
            data-settings-card
            style_config={hidden_style}
            content={(
                <>{configuration_name}</>
            )} 
            hidden_content={(
                <>
                    {
                        configuration_data.map(({ key, value }: Configuration) => {
                            return value ? 
                            <>
                                <div className="card-settings-key card-interaction" data-fit-align={fit_align}>{key}</div>
                                <div className="card-settings-value card-interaction" data-fit-align={fit_align}>{value}</div>
                            </> :
                            <>
                                <div className="card-settings-key card-interaction" data-expand>{key}</div>
                            </>
                        })
                    }
                </>
            )} />
    )
}

export default SettingsCard