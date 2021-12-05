import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const Header = () => {
    let {keycloak} = useKeycloak();

    return (
        <header>
            <ul className="navbar bg-danger p-0" style={{height: "5em"}}>
                <li className="list-inline text-white m-3 btn">
                    <Link to={"/home"} style={{textDecoration: 'none', color: "inherit"}}>Home Page</Link></li>
                <li className="list-inline text-white m-3 btn" onClick={() => keycloak.logout()}>Log Out</li>
            </ul>
        </header>
    )
}

export default Header;