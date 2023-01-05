import { Fragment } from "react";

export default function InfoTicketItem(props) {
  return (
    <Fragment>
      <h2 className="text-xl font-extrabold ">{props.title}</h2>
      <div className="grid grid-cols-2 pb-5">
        <h3 className="text-lg font-bold">PRICE:</h3>
        <h3 className="text-lg font-light">$ {props.price}</h3>
      </div>
    </Fragment>
  );
}
