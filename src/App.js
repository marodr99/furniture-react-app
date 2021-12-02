import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./Keycloak";
import LogIn from "./LogIn/LogIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import {PrivateRoute} from "./routes/PrivateRoute";
import Spinner from "./Spinner/Spinner";

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}
                               LoadingComponent={<Spinner/>}>
            <Router>
                <Routes>
                    <Route path={"/home"}
                           element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><HomePage/></PrivateRoute>}/>
                    <Route path={"/"} element={<LogIn/>}/>
                </Routes>
            </Router>
        </ReactKeycloakProvider>
    );
}

export default App;
