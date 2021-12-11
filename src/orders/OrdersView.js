import Header from "../Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "../routes/PrivateRoute";
import OrdersListView from "./OrdersListView";
import SingleOrderView from "./SingleOrderView";

const OrdersView = () => {
    let [orders, setOrders] = useState([]);
    let {keycloak} = useKeycloak();
    let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:8080/manage/orders", {headers: {'Authorization': `Bearer ${keycloak.token}`}})
            .then(res => setOrders(res.data))
            .catch(err => console.log("Can not get orders")).finally(setIsLoading(false))
    }, [])

    return (
        isLoading ? null :
            <div>
                <Header/>
                <Routes>
                    <Route path={":id"} element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><SingleOrderView
                        orders={orders} isLoading={isLoading}/></PrivateRoute>}/>
                    <Route path={"/"} element={<PrivateRoute roles={["ADMIN", "EMPLOYEE"]}><OrdersListView
                        orders={orders}/></PrivateRoute>}/>
                </Routes>
            </div>
    )
}

export default OrdersView;