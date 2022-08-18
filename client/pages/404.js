import Image from "next/image";
import Link from "next/link";
import AppCard from "../components/general/AppCard";

const image = require("../public/images/404.png");

export default function FourOhFour() {
  return (
    <div className="flex md:w-1/2 mx-auto py-10">
      <AppCard>
        <div className="md:grid md:grid-cols-2 justify-items-center items-center m-10 p-5 md:p-10 ">
          <section>
            <Image
              src={image}
              quality={100}
              width="350"
              height="350"
              placeholder="blur"
              layout="intrinsic"
            />
          </section>
          <section>
            <h1 className="text-left text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              404 
            </h1>
            <h1 className="text-left text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              Not
            </h1>
            <h1 className="text-left text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              Found
            </h1>

            <Link href="/">
              <a className="text-left text-lg font-semibold ">🏠​ Go back home</a>
            </Link>
          </section>
        </div>
      </AppCard>
    </div>
  );
}
