import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: 'http://localhost:8090/auth',
    realm: 'furniture-app',
    clientId: 'furniture-client'
}

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;