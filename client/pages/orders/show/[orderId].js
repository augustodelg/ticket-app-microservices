import Image from "next/image";
import Router from "next/router";

import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import AppCard from "../../../components/general/AppCard";
import AppModal from "../../../components/general/appModal/AppModal";
import APP from "../../../config/appConfig";
import ApiClient from "../../../services/ApiClient";
import TimeLeft from "./components/timeLeft";
import { loadStripe } from "@stripe/stripe-js";
import OrderInformation from "./components/orderInformation";
import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";

const image = require("../../../public/images/orderPay.png");

const OrderShow = (props) => {
  return (
    <div className=" md:w-2/4 mx-auto py-10 Z">
      <AppCard className="md:mr-1 h-auto py-5 md:p-10">
        <div className="grid lg:grid-cols-2">
          <div className="my-auto">
            <Image
              quality={100}
              src={image}
              placeholder="blur"
              layout="responsive"
            />
          </div>
          <div className="ml-4 mx-auto my-auto">
            <OrderInformation order={props.order} />
          </div>
        </div>
      </AppCard>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  const { data } = await ApiClient(context).get(`/api/orders/${orderId}`);
  return {
    props: { order: data }, // will be passed to the page component as props
  };
}

export default OrderShow;
