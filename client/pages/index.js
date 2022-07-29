import Head from "next/head";
import Image from "next/image";
import AppButton from "../components/general/AppButton";
import AppCard from "../components/general/AppCard";
import useUser from "../hooks/useUser";

const image = require("../public/images/home.png");


const cardsText = [
  {
    title: "High availability",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-60",
  },
  {
    title: "Based On Microservices",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-48",
  },
  {
    title: "Kubernetes Ready",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crastincidunt felis nec sem ornare euismod. Phasellus rhoncus nulla in tortor egestas auctor at sit amet ante. Cras elementum ante at libero luctus bibendum. Mauris eget orci porta, malesuada odio nec, pulvinar mauris. Fusce condimentum lobortis lobortis.",
    traslatle: "md:-translate-y-40",
  },
];
const Home = (props) => {
  const user = useUser();
  return (
    <div className="md:w-1/2 mx-auto">
      <section className="grid grid-cols-6  pt-5 md:pt-0 justify-items-center items-center ">
        <div className="mb-10 pl-10 col-span-full md:col-span-4  md:mb-0  md:-translate-y-20  md:scale-110">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Your event just a
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-indigo-500">
            CLICK AWAY
          </h1>
          <p className="text-md md:text-xl md:font-light text-white pb-4 ">
            The platform designed to buy tickets for you favourites events.
          </p>
          <AppButton text="See Events" />
        </div>
        <div className="hidden md:block col-span-2  scale-75	translate-y-5 ">
          <Image
            quality={100}
            src={image}
            width="315"
            height="720"
            placeholder="blur"
            layout="fixed"
          />
        </div>
      </section>
      <section className="grid grid-cols-1  md:grid-cols-3 justify-items-center items-center text-center">
        {cardsText.map((card) => {
          return (
            <div className={`w-80 pb-5 ${card.traslatle} md:hover:scale-95 duration-500`}>
              <AppCard>
                <div className="grid p-10">
                  <h2 className="grid-span-2 text-lg font-black text-indigo-500 uppercase">
                    {card.title}
                  </h2>
                  <p className="grid-span-2 text-xs font-regular ">
                    {card.content}
                  </p>
                </div>
              </AppCard>
            </div>
          );
        })}
      </section>
      <section className="grid grid-cols-12 bg-indigo-500/20 rounded-3xl ">
        asdsad
      </section>
      {/* {props.currentUser ? (
        <h1 className="block text-gray-700 text-xl font-bold m-2">
          Hi {user.email}
        </h1>
      ) : (
        <h1> You are NOT signed in</h1>
      )} */}
    </div>
  );
};

export default Home;
