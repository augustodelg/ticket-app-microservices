import AppCard from "../../../components/general/AppCard";

export default function HomeCard(props) {
  return (
    <div
      className={`mx-3 md:mx-0 pb-5 scale-100 md:scale-75 lg:scale-90 2xl:scale-125 ${props.traslatle} 2xl:hover:scale-110 duration-500`}
    >
      <AppCard>
        <div className="grid px-10 py-5">
          <h2 className="grid-span-2 pb-5 text-lg font-black tracking-tight text-indigo-500 capitalize">
            {props.title}
          </h2>
          <p className="grid-span-2 text-xs font-light ">{props.content}</p>
        </div>
      </AppCard>
    </div>
  );
}
