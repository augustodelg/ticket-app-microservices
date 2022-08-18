import HomeCard from "./homeCard";

export default function CardsSection(props) {
  return (
    <section className="grid grid-cols-1  md:grid-cols-3 justify-items-center  items-center text-center">
      {props.cardsData.map((card) => {
        return <HomeCard {...card}></HomeCard>;
      })}
    </section>
  );
}
