import Head from "next/head";
import Image from "next/image";
import AppButton from "../../components/general/AppButton";
import AppCard from "../../components/general/AppCard";
import useUser from "../../hooks/useUser";
import CardsSection from "./components/cardsSection";
import HomeCard from "./components/homeCard";
import WelcomeSection from "./components/welcomeSection";


const cardsText = [
  {
    title: "High availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-48",
  },
  {
    title: "Based On Microservices",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-32",
  },
  {
    title: "Kubernetes Ready",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-16",
  },
];
const Home = (props) => {
  const user = useUser();
  return (
    <div className="md:w-1/2 mx-auto">
      <WelcomeSection/>
      <CardsSection cardsData={cardsText}/>
      <section className="grid grid-cols-12 bg-indigo-500/20 rounded-3xl ">
        asdsad
      </section>
    </div>
  );
};

export default Home;
