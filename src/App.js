import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./Keycloak";
import LogIn from "./LogIn/LogIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import {PrivateRoute} from "./routes/PrivateRoute";

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
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
