import AppButton from "../../components/general/AppButton";
import useInput from "../../hooks/useInput";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import Image from "next/image";
import Head from "next/head";

const image = require("../../public/images/emoji.png");

export default function Signup() {
  const [email, emailInput] = useInput({
    label: "Email",
    placeholder: "email@example.com",
    type: "email",
  });
  const [password, passwordInput] = useInput({
    label: "Password",
    placeholder: "Between 4 and 20 characters",
    type: "password",
  });

  const [doRequest, errors] = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="flex h-screen md:justify-center bg-indigo-200">
      <div class="absolute  inset-0 bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="md:grid md:grid-cols-2 p-10 h-auto md:h-3/5 w-screen md:w-auto md:m-10 bg-white/90 rounded-xl shadow-lg shadow-indigo-500/40 my-auto z-40 ">
        <div className="mb-10 md:my-auto">
          <div>
            <Image
              src={image}
              width="400"
              height="250"
              placeholder="blur"
              layout="fixed"
            />
          </div>
        </div>
        <div className="mb-10 md:my-auto">
          <div className="mb-10 md:my-auto">
            <h1 className="text-left text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
              SIGN UP
            </h1>
            <h1 className="mb-5 text-left  text-2xl  font-light ">to tacket</h1>
          </div>
          <form className="my-auto mx-auto" onSubmit={onSubmit}>
            {emailInput}
            {passwordInput}
            <AppButton text="Sign Up" />
          </form>
        </div>
      </div>
      {errors}
    </div>
  );
}
