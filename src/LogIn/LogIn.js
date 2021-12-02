import "./LogIn.css";
import {useKeycloak} from "@react-keycloak/web";
import {useCallback} from "react";
import {Navigate} from "react-router-dom";

const LogIn = () => {

    const {keycloak} = useKeycloak();
    const login = useCallback(() => {
        keycloak.login()
    }, [keycloak])

    if (keycloak.authenticated)
        return <Navigate to={"/home"}/>

    return (
        <div className="container">
            <button onClick={login} className="btn btn-dark">Log In</button>
        </div>
    )
}

export default LogIn;