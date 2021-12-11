import {useNavigate} from "react-router-dom";

const Order = ({order}) => {
    let navigate = useNavigate();
    return (
        <div className="card m-3 bg-secondary text-white d-inline-block" style={{width: "15em", height: "10em"}}
        onClick={() => navigate(`${order.orderId}`)}>
            <div className="card-body text-center d-flex flex-column h-100 justify-content-around">
                <div>{order.email}</div>
                <div>{order.title}</div>
                <div>{order.furnitureType}</div>
                <div>{order.date}</div>
            </div>
        </div>
    )
}

export default Order;