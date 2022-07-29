import AppButton from "../../general/AppButton";
import useUser from "../../../hooks/useUser";
import Link from "next/link";


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
    <div className="flex top-0 justify-center bg-gradient-to-b from-indigo-400/50 to-indigo-200 z-50 pt-4">
      <navbar className=" w-4/5 md:w-1/2 backdrop-blur-sm flex items-center justify-between flex-wrap p-2  bg-white rounded-full">
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
            <h3 className="text-xl font-extrabold italic my-auto pl-4 text-indigo-300">
              Tacket.
            </h3>
          </Link>
          <ul className="flex flex-row">{links.map((link) => link)}</ul>
        </div>
      </navbar>
    </div>
  );
}
