import KakaoAD from "../ui/KakaoAD";
import "../../styles/styles_intro.css"
import app_logo from "../../assets/phantom.svg"
import "../../styles/styles_table.css"
import { useAuth0 } from "@auth0/auth0-react";

function IntroApplication() {
    const { loginWithRedirect } = useAuth0()

    const login_handler = () => {
        loginWithRedirect()
    }

    return (
        <div className="settings intro ui-container">
            <h1 className="intro-title-main intro-center">PHANTOM</h1>
            <div className="settings-container">
                <div className="intro-container intro-center">
                    <img src={app_logo} width={150} height={150} />
                </div>
                <div className="intro-container">
                    <h2 className="intro-subtitle intro-margin">One Key for One Lock</h2>
                    <p className="intro-maintext">Many users reuse passwords across multiple services, which is a major security risk. PHANTOM <b>salts</b> passwords per service using hashes!</p>
                </div>
                <div className="intro-container">
                    <h2 className="intro-subtitle intro-margin">What is salting?</h2>
                    <p className="intro-maintext">
                        Google provides <b>"recommend me a strong password"</b> feature, which generates a random series of alphabets and claims it a <b>password</b>. However, random passwords are ridiculous.
                        Although chrome saves and syncs them automatically, you don't have control of your own passwords when put outside of the box.
                        <br />
                        <br />
                        Salting is a technique that concatenates a few alphabets to your text and hashes it. Though a hash might seem random, one unique text corresponds to one unique hash. Thus if whenever you hash a password with 
                        a different salt <b>(the key like ABF33EF and the service name like instagram.com)</b>, a completely different <b>hash</b> will be generated. So no need to change your passwords. Just revoke your key with 
                        one-click and all your passwords will be minted again.
                        <br />
                        <br />
                        <div className="styled-table-container">
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Password</th>
                                        <th>Key</th>
                                        <th>Minted Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>github.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ab3f44d</td>
                                        <td>1b716b258d55910e</td>
                                    </tr>
                                    <tr>
                                        <td>google.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ab3f44d</td>
                                        <td>f9261ca57af041f4</td>
                                    </tr>
                                    <tr>
                                        <td>instagram.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ab3f44d</td>
                                        <td>ad1a1c210d5a3005</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="styled-table-container">
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Password</th>
                                        <th>Key</th>
                                        <th>Minted Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>github.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ff302de</td>
                                        <td>56ccdf3cb20edabf</td>
                                    </tr>
                                    <tr>
                                        <td>google.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ff302de</td>
                                        <td>98f04fe294a6b0f5</td>
                                    </tr>
                                    <tr>
                                        <td>instagram.com</td>
                                        <td>ilovesmurfs0123&</td>
                                        <td>ff302de</td>
                                        <td>cad42415e5060574</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </p>
                </div>
                <br />
                <br />
                <div className="intro-container intro-center">
                    <button className="card-btn" onClick={login_handler}><h2 className="intro-subtitle">Start PHANTOM</h2></button>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
}

export default IntroApplication;