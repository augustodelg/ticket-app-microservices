import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Router from "next/router";
import { Fragment, useState } from "react";
import AppModal from "../../../../components/general/appModal/AppModal";
import APP from "../../../../config/appConfig";
import useRequest from "../../../../hooks/useRequest";
import CheckoutForm from "./checkoutForm";
import TimeLeft from "./timeLeft";

const stripePromise = loadStripe(APP.CREDENTIALS.STRIPE_PUBLIC);

export default function OrderInformation(props) {

  function timeOut() {
    Router.push(
      "/tickets/show/[ticketId]",
      `/tickets/show/${props.order.ticket.id}`
    );
  }

  return (
    <Fragment>
      <p className="text-6xl font-extrabold mb-4">{props.order.ticket.title}</p>
      <p className="text-5xl font-extrabold text-indigo-500 mb-4">
        ${props.order.ticket.price}
      </p>
      <div className="mb-10">
        <p className="text-xl font-extrabold text-indigo-500  ">Expire at:</p>
        <TimeLeft expireAt={props.order.expiresAt} actionTimeOut={timeOut} />
      </div>

      <AppModal  textButton={"Pay"}>
        <div className="h-auto w-auto">

            <Elements stripe={stripePromise} >
              <CheckoutForm
                orderId={props.order.id}
              />
            </Elements>

        </div>
      </AppModal>
    </Fragment>
  );
}
