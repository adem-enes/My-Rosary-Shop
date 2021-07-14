import { Products, Orders, CreateUpdateProduct, Category, UpdateOrder } from './Screens';

export const screens = (activeTab, props) => {
    switch (activeTab) {
        case 0:
            return <Products setActiveTab={props.setActiveTab}
                setUpdateProduct={props.setUpdateProduct} />
        case 1:
            return <Orders setUpdateOrder={props.setUpdateOrder}
                setActiveTab={props.setActiveTab} />
        case 2:
            return <CreateUpdateProduct productId={props.updateProduct}
                setActiveTab={props.setActiveTab} />
        case 3:
            return <Category />
        case 4:
            return <UpdateOrder updateOrder={props.updateOrder} />
        default:
            return (
                <div>Dasboard</div>
            )
    }
}