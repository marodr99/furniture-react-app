import {ReactKeycloakProvider} from '@react-keycloak/web'
import keycloak from "./Keycloak";
import LogIn from "./LogIn/LogIn";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import {PrivateRoute} from "./routes/PrivateRoute";
import Spinner from "./Spinner/Spinner";
import FurnitureView from "./Furniture/FurnitureView";
import OrdersView from "./orders/OrdersView";
import ReportsPage from "./reports/ReportsPage";

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}
                               LoadingComponent={<Spinner/>}>
            <Router>
                <Routes>
                    <Route path={"/reports"}
                           element={<PrivateRoute roles={["ADMIN"]}><ReportsPage/></PrivateRoute>}/>
                    <Route path={"/orders/*"}
                           element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><OrdersView/></PrivateRoute>}/>
                    <Route path={"/furniture/*"}
                           element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><FurnitureView/></PrivateRoute>}/>
                    <Route path={"/home"}
                           element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><HomePage/></PrivateRoute>}/>
                    <Route path={"/"} element={<LogIn/>}/>
                </Routes>
            </Router>
        </ReactKeycloakProvider>
    );
}

export default App;
