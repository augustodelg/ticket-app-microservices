import AppButton from "../../components/general/AppButton";
import useInput from "../../hooks/useInput";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import Image from "next/image";
import Head from "next/head";
import AppCard from "../../components/general/AppCard";

const image = require("../../public/images/signin.png");

export default function Signin() {
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
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/home"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="flex md:w-1/2 mx-auto py-10">
      
      <AppCard>
        <div className="md:grid md:grid-cols-2 justify-items-center items-center m-10 p-5 md:p-10 ">
          <section>
            <Image
              src={image}
              quality={100}
              width="350"
              height="320"
              placeholder="blur"
              layout="intrinsic"
            />
          </section>

          <section>
            <div>
              <h1 className="text-left text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500  ">
                SIGN IN
              </h1>
              <h1 className="mb-5 text-left  text-2xl  font-light ">
                to tacket
              </h1>
            </div>
            <form className="my-auto mx-auto" onSubmit={onSubmit}>
              {emailInput}
              {passwordInput}
              <AppButton text="Sign In" />
            </form>
          </section>
        </div>
      </AppCard>

      {errors}
    </div>
  );
}
