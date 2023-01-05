import Image from "next/image";
import Link from "next/link";
import AppButton from "../../../../components/general/AppButton";
import AppCard from "../../../../components/general/AppCard";
import InfoTicketItem from "./infoTicketItem";

const image = require("../../../../public/images/mockImage.jpg");

export default function TicketItem(props) {
  return (
    <AppCard className=" md:my-4 ">
      <div className="grid grid-cols-1 xl:grid-cols-4 divide-x">
        <div className="col-span-3  ">
          <Image
            quality={100}
            src={image}
            placeholder="blur"
            layout="responsive"
          />
        </div>
        <div className="grid p-10 ">
          <InfoTicketItem title={props.title} price={props.price}/>
          <Link
            href="/tickets/show/[ticketId]"
            as={`/tickets/show/${props.id}`}
          >
            <AppButton text="View" className="h-12 w-full" />
          </Link>
        </div>
      </div>
    </AppCard>
  );
}
