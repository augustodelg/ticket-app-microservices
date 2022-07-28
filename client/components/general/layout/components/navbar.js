import AppButton from "../../AppButton";
import useUser from "../../../../hooks/useUser";
import Link from "next/link";

const image = require("../../../../public/images/emoji.png");

export default function Navbar() {
  const user = useUser();
  console.log(user);
  const links = [
    !user && { label: "Sign Up", href: "/auth/signup" },
    !user && { label: "Sign In", href: "/auth/signin" },
    user && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li>
          <div className="pr-1">
            <Link href={href}>
              <AppButton text={label} />
            </Link>
          </div>
        </li>
      );
    });

  return (
    <navbar className="sticky top-0  w-full backdrop-blur-sm flex items-center justify-between flex-wrap p-4 bg-gradient-to-b from-indigo-400/50 to-indigo-200 z-50">
      <div className="container flex items-center justify-between">
        {/* <div className="md:grid md:grid-cols-2  h-auto md:h-3/5 w-screen md:w-auto   ">
          <Image
            src={image}
            width="75"
            height="50"
            placeholder="blur"
            layout="fixed"
          /> */}
        <Link href={"/"}>
          <h3 className="text-xl font-extrabold my-auto text-indigo-500">
            TACKTER
          </h3>
        </Link>
        <ul className="flex flex-row">{links.map((link) => link)}</ul>
      </div>
    </navbar>
  );
}
