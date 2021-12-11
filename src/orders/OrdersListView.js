import Order from "./Order";

const OrdersListView = ({orders}) => {

    let ordersList = orders.map(order => <Order key={order.orderId} order={order}/>)

    return (
        <div>
            {ordersList}
        </div>
    )
}

export default OrdersListView;