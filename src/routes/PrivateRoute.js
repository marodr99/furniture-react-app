import {Navigate} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

export function PrivateRoute({children, roles}) {
    const {keycloak} = useKeycloak();

    const isAutherized = (roles) => {
        if (keycloak && roles) {
            return roles.some(r => {
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
    }

    return isAutherized(roles) ? children : <Navigate to={"/"}/>
}