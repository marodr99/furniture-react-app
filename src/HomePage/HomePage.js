import Card from "./Card/Card";
import {useKeycloak} from "@react-keycloak/web";
import Header from "../Header/Header";
import "./homePage.css"

const HomePage = () => {
    let {keycloak} = useKeycloak();

    let reports = null
    let keycloakAccess = <Card imageName={"management.svg"} alt="management" cardTitle="Accounts"
                               cardColor="bg-secondary"
                               link={`http://192.168.0.11:8090/auth/realms/furniture-app/account?referrer=${keycloak.clientId}`}
                               isLinkToExternalSite={true}/>
    if (keycloak.hasRealmRole("ADMIN")) {
        keycloakAccess = <Card imageName={"management.svg"} alt="management" cardTitle="Accounts"
                               cardColor="bg-secondary"
                               link={`http://192.168.0.11:8090/auth/admin/furniture-app/console`}
                               isLinkToExternalSite={true}/>
        reports = <Card imageName={"report.svg"} alt="Reports" cardTitle="Reports" cardColor="bg-success" link={"/"}/>
    }
    return (
        <div>
            <Header/>
            <div
                className="d-flex justify-content-center container full-page-height-without-header
                full-page-height-without-header flex-column d-sm-flex flex-sm-row">
                {keycloakAccess}
                <Card imageName={"furniture.svg"} alt="furniture" cardTitle="Furniture" cardColor="bg-primary"
                      link={"/furniture"}/>
                <Card imageName={"shopping-basket.svg"} alt="Orders" cardTitle="Orders" cardColor="bg-warning"
                      link={"/"}/>
                {reports}
            </div>
        </div>
    )
}

export default HomePage;