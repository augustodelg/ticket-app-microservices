import AppButton from "../../components/general/AppButton";
import useInput from "../../hooks/useInput";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import Image from "next/image";
import AppCard from "../../components/general/AppCard";

const image = require("../../public/images/signup.png");

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
    onSuccess: () => Router.push("/home"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="md:w-1/2 mx-auto py-10">
      <div class="absolute  bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <AppCard>
        <div className="sm:grid sm:grid-col-2  lg:grid-cols-2 justify-items-center items-center m-10 p-5 md:p-10 ">
          <section >
            <Image
              src={image}
              quality={100}
              width="350"
              height="350"
              placeholder="blur"
              layout="intrinsic"
            />
          </section>
          <section >
            <div >
              <h1 className="text-left text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 ">
                SIGN UP
              </h1>
              <h1 className="mb-5 text-left  text-2xl  font-light ">
                to tacket
              </h1>
            </div>
            <form className="my-auto mx-auto" onSubmit={onSubmit}>
              {emailInput}
              {passwordInput}
              <AppButton text="Sign Up" />
            </form>
          </section>
        </div>
      </AppCard>

      {errors}
    </div>
  );
}
