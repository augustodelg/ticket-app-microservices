import Router from "next/router";
import AppButton from "../../components/general/AppButton";
import AppCard from "../../components/general/AppCard";
import useInput from "../../hooks/useInput";
import useRequest from "../../hooks/useRequest";

const CreateTicket = () => {
  const [title, titleInput] = useInput({
    label: "Title",
    placeholder: "Example Title",
    type: "text",
    
  });
  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };
  
  const [price, priceInput, setPrice] = useInput({
    label: "Price",
    placeholder: "$1000",
    type: "number",
    onBlur,
  });

  const [doRequest, errors] = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/home"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  

  return (
    <div className=" md:w-3/6 mx-auto py-10">
      <AppCard>
        <div className="sm:grid sm:grid-col-2  lg:grid-cols-2 md:grid-cols-2 justify-items-center items-center m-10 p-5 md:p-10">
          <h1>CreateTicket</h1>
          <form className="my-auto mx-auto" onSubmit={onSubmit}>
            {titleInput}
            {priceInput}
            <AppButton text="Create" />
          </form>
        </div>
      </AppCard>
      {errors}
    </div>
  );
};

export default CreateTicket;
