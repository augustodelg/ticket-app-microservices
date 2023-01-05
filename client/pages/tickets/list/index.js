import AppCard from "../../../components/general/AppCard";
import ApiClient from "../../../services/ApiClient";
import TicketItem from "./components/ticketItem";

const ListTickets = (props) => {
  const generateList = () => {
    return props.tickets.map((ticket) => (
      <TicketItem title={ticket.title} price={ticket.price} id={ticket.id}/>
    ));
  };

  return (
    <div className="grid md:grid-cols-4 md:w-4/5 mx-auto py-10">
      <AppCard className='md:mr-1 h-auto'>search</AppCard>
      <AppCard className='md:h-auto col-span-3 md:ml-1'>
        <div className="grid grid-cols-1 gap-2  p-5 md:p-2 ">
          {generateList()}
        </div>
      </AppCard>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { data } = await ApiClient(context).get("/api/tickets");
  return {
    props: { tickets: data }, // will be passed to the page component as props
  };
}

export default ListTickets;
