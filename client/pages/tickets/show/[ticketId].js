import Image from "next/image";
import Router from "next/router";

import AppButton from "../../../components/general/AppButton";
import AppCard from "../../../components/general/AppCard";
import useRequest from "../../../hooks/useRequest";
import ApiClient from "../../../services/ApiClient";

const image = require("../../../public/images/mockImage.jpg");

const TicketShow = (props) => {
  const [doRequest, errors] = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: props.ticket.id,
    },
    onSuccess: (order) => Router.push("/orders/show/[orderId]", `/orders/show/${order.id}`),
  });

  return (
    <div className="md:w-2/4 mx-auto py-10 Z">
      <AppCard className="md:mr-1 h-auto p-10">
        <div className="mb-4">
          <Image
            quality={100}
            src={image}
            placeholder="blur"
            layout="responsive"
          />
        </div>

        <h1 className="text-6xl font-extrabold">{props.ticket.title}</h1>
        <h2 className="text-5xl font-extrabold text-indigo-500 mb-4">
          ${props.ticket.price}
        </h2>
        <AppButton
          text="Buy"
          onClick={() => doRequest()}
          className="h-12 w-full md:w-60"
        />
      </AppCard>
      {errors}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { ticketId } = context.query;
  const { data } = await ApiClient(context).get(`/api/tickets/${ticketId}`);
  return {
    props: { ticket: data }, // will be passed to the page component as props
  };
}

export default TicketShow;
