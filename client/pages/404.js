import Image from "next/image";
import Link from "next/link";
import AppCard from "../components/general/AppCard";

const image = require("../public/images/404.png");

export default function FourOhFour() {
  return (
    <div className="flex md:w-3/5 mx-auto pt-2">
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
            <h1 className="text-left text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              404 ​
            </h1>
            <h1 className="text-left text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              Page Not Found
            </h1>

            <Link href="/">
              <a>🏠​ Go back home</a>
            </Link>
          </section>
        </div>
      </AppCard>
    </div>
  );
}
