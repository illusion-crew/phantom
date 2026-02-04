import { useEffect, useRef, useState } from "react";
import ServiceCard from "../ui/cards/ServiceCard";
import { element_list_placeholder, run_if_exists } from "../../util/phantom_utils";
import InformationCard from "../ui/cards/InformationCard";
import AddServiceModal, { ServiceModalReference } from "../ui/modals/AddServiceModal";
import { Application } from "../../types/phantom_types";
import { fetch_applications_list } from "../../api/authentication";
import { useAuth0 } from "@auth0/auth0-react";
import KakaoAD from "../ui/KakaoAD";

function MainApplication() {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()
    
    const [text_content, set_text_content] = useState("")
    const [navigate_token, set_navigate_token] = useState(0)
    const [app_list, set_app_list] = useState<Application[]>([])
    const [jwt_auth_token, set_jwt_auth_token] = useState("")

    const service_modal_ref = useRef<ServiceModalReference | null>(null)

    useEffect(() => {
        (async () => {
            set_app_list(await fetch_applications_list(jwt_auth_token))
        })()
    }, [navigate_token, jwt_auth_token])

    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    set_jwt_auth_token(token)
                } catch (e) {
                    console.error(e);
                }
            }
        };
        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) return <div>Loading...</div>;

    const input_change_handler = (e: React.ChangeEvent) => {
        set_text_content((e.target as HTMLInputElement).value)
    }

    const add_service_handler = () => {
        run_if_exists(service_modal_ref, _service_modal_ref => {
            _service_modal_ref.modal_toggle()
        })
    }

    return (
        <div className="app ui-container">
            <div className="app-searchbar-container">
                <input type="text" onChange={input_change_handler} className="app-searchbar" placeholder="Search" />
            </div>
            <div className="app-recent">
                <h1 className="app-recent-title">Search Results</h1>
                <div className="app-recent-container">
                    {
                        element_list_placeholder(
                            app_list.filter(e => e.service_name.startsWith(text_content))
                                .map(e => {
                                    return <ServiceCard jwt_auth_token={jwt_auth_token} img={e.img} service_name={e.service_name} />
                                }),
                            <InformationCard
                                information_key={<>No Results</>}
                                information_value={<></>}
                            />
                        )
                    }
                </div>
                <h1 className="app-recent-title">All Applications</h1>
                <div className="app-recent-container">
                    {
                        app_list.map(e => {
                            return <ServiceCard jwt_auth_token={jwt_auth_token} img={e.img} service_name={e.service_name} />
                        })
                    }
                    <InformationCard 
                        information_key={(
                            <>Add New Service</>
                        )} 
                        information_value={(
                            <></>
                        )}
                        data-information-reversed
                        on_click={add_service_handler}
                    />
                </div>
            </div>
            <AddServiceModal reload_ui={() => set_navigate_token(navigate_token + 1)} ref={service_modal_ref} />
        </div>
    );
}

export default MainApplication;