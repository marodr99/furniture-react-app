import Card from "./Card/Card";
import {useKeycloak} from "@react-keycloak/web";
import Header from "../Header/Header";

const HomePage = () => {
    let {keycloak} = useKeycloak();

    let reports = null
    let keycloakAccess = <Card imageName={"management.svg"} alt="management" cardTitle="Accounts"
                               cardColor="bg-secondary"
                               link={`http://localhost:8090/auth/realms/furniture-app/account?referrer=${keycloak.clientId}`}/>
    if (keycloak.hasRealmRole("ADMIN")) {
        keycloakAccess = <Card imageName={"management.svg"} alt="management" cardTitle="Accounts"
                               cardColor="bg-secondary"
                               link={`http://localhost:8090/auth/admin/furniture-app/console`}/>
        reports = <Card imageName={"report.svg"} alt="Reports" cardTitle="Reports" cardColor="bg-success" link={"/"}/>
    }
    return (
        <div>
            <Header/>
            <div className="d-flex justify-content-center container">
                {keycloakAccess}
                <Card imageName={"furniture.svg"} alt="furniture" cardTitle="Furniture" cardColor="bg-primary"
                      link={"/"}/>
                <Card imageName={"shopping-basket.svg"} alt="Orders" cardTitle="Orders" cardColor="bg-warning"
                      link={"/"}/>
                {reports}
            </div>
        </div>
    )
}

export default HomePage;