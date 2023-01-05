import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import AppButton from "../../../../components/general/AppButton";
import useRequest from "../../../../hooks/useRequest";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [doRequest, errors] = useRequest({
  //   url: "/api/payments",
  //   method: "post",
  //   body: {
  //     orderId: props.orderId,
  //     clientSecret: props.clientSecret,
  //   },
  // });

  const [doRequest, errors] = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: props.orderId,
    },
    onSuccess: ()=> Router.push('/orders/confirm/[orderId]',`/orders/confirm/${props.orderId}`)
  });

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { token } = await stripe.createToken(
      elements.getElement("card", elements.getElement(CardElement))
    );
    console.log(token);

    await doRequest({ token: token.id });

    setIsLoading(false);
  };

  return (
    <Fragment>
    <form id="payment-form" onSubmit={handleSubmit}>
      {!message ? (
        <div className="w-96">
          <CardElement id="card" />

          {/* <PaymentElement id="payment-element" /> */}
          <AppButton
            disabled={isLoading || !stripe || !elements}
            text={`${isLoading ? "Loading..." : "Pay now"}`}
            className="mt-4"
          />
        </div>
      ) : (
        <div id="payment-message">{message}</div>
      )}
    </form>
    {errors}
    </Fragment>
  );
}
