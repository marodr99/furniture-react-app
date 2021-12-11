import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";

const SingleOrderView = ({orders, isLoading}) => {
    let {id} = useParams();
    let [order, setOrder] = useState({
        name: "",
        surname: "",
        phoneNumber: "",
        houseNumber: "",
        flatNumber: "",
        street: "",
        postalCode: "",
        orderEmail: "",
        city: "",
    });
    let {keycloak} = useKeycloak();

    useEffect(() => {
        if (orders.length > 0) {
            let ordr = orders.find(o => o.orderId == id)
            setOrder(ordr)
        }
    }, [id, orders])

    const handleOnSaveClick = async () => {
        await axios.put(`http://localhost:8080/manage/orders/${id}`, order, {headers: {'Authorization': `Bearer ${keycloak.token}`}})
            .then(res => {
                console.log("Order edited successfully")
                window.location = "/orders"
            })
            .catch(err => console.log("Error editing order", err))
    }

    const handleOnDeleteClick = async () => {
        await axios.delete(`http://localhost:8080/manage/orders/${id}`, {headers: {'Authorization': `Bearer ${keycloak.token}`}})
            .then(res => {
                console.log("Order deleted successfully")
                window.location = "/orders"
            })
            .catch(err => console.log("Error while deleting order"));
    }

    return (
        isLoading ? null : <div>
            <form style={{padding: "1em 3em 1em 3em"}}>
                <div>
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" value={order.name}
                           onChange={(e) => setOrder({...order, name: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Surname</label>
                    <input className="form-control" type="text" value={order.surname}
                           onChange={(e) => setOrder({...order, surname: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Phone number</label>
                    <input className="form-control" type="text" value={order.phoneNumber}
                           onChange={(e) => setOrder({...order, phoneNumber: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">House number</label>
                    <input className="form-control" type="text" value={order.houseNumber}
                           onChange={(e) => setOrder({...order, houseNumber: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Flat number</label>
                    <input className="form-control" type="text" value={order.flatNumber}
                           onChange={(e) => setOrder({...order, flatNumber: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Street</label>
                    <input className="form-control" type="text" value={order.street}
                           onChange={(e) => setOrder({...order, street: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Postal code</label>
                    <input className="form-control" type="text" value={order.postalCode}
                           onChange={(e) => setOrder({...order, postalCode: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">Order email</label>
                    <input className="form-control" type="text" value={order.orderEmail}
                           onChange={(e) => setOrder({...order, orderEmail: e.target.value})}/>
                </div>
                <div>
                    <label className="form-label">City</label>
                    <input className="form-control" type="text" value={order.city}
                           onChange={(e) => setOrder({...order, city: e.target.value})}/>
                </div>
            </form>
            <div className="d-flex justify-content-between m-2">
                <button className="btn bg-danger" onClick={handleOnDeleteClick}>Delete</button>
                <button className="btn bg-warning" onClick={handleOnSaveClick}>Save</button>
            </div>
        </div>
    )
}

export default SingleOrderView;