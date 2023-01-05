import AppCard from "../../components/general/AppCard";
import ApiClient from "../../services/ApiClient";
const Orders = (props) => {
  return (
    <div className=" md:w-2/4 mx-auto py-10 Z">
      <AppCard className="md:mr-1 h-auto py-5 md:p-10">
        {props.orders.map((order)=> {
          // return <OrderItem order={order}/>
          return <p>{JSON.stringify(order)}</p>
        })}
      </AppCard>
    </div>
  )
}

export async function getServerSideProps(context) {
    const { data } = await ApiClient(context).get('/api/orders');
    return {
      props: { orders: data }, // will be passed to the page component as props
    };
  }
  export default Orders;