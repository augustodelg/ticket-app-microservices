import Image from "next/image";
import  Router  from "next/router";
import { lazy } from "react";
import AppButton from "../../../components/general/AppButton";

const image = require("../../../public/images/home.png");

export default function WelcomeSection() {


  const handleClick = (e) => {
    e.preventDefault()
    Router.push('/tickets/list')
  }


  return (
    <section className="grid grid-cols-7  pt-5 md:pt-0 justify-items-center items-center ">
      <div className="mb-10 pl-10 md:pl-0 col-span-full md:col-span-5  md:mb-0  md:-translate-y-20  md:scale-110">
        <h2 className="text-3xl lg:text-6xl  font-black tracking-tighter text-white">
          Your event just a
        </h2>
        <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tight text-indigo-500">
          CLICK AWAY
        </h1>
        <p className="text-md lg:text-xl  subpixel-antialiased text-white pb-4 w-4/5">
          The platform designed to buy tickets for you favourites events.
        </p>
        <AppButton text="See Events" onClick={handleClick} ></AppButton>
      </div>
      <div className="hidden md:block col-span-2 	translate-y-12 scale-100 md:scale-90 2xl:scale-100">
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
  );
}
