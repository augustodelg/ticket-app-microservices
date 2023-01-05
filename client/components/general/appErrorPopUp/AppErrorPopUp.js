import { useEffect, useState } from "react";
import CloseButtonError from "./components/closeButtonError";
import IconAlert from "./components/iconAlert";
import ListError from "./components/listError";

export default function AppErrorPopUp(props) {
  const [showAlert, setShowAlert] = useState(true);
  console.log(props);

  useEffect(() => {
    setShowAlert(true);
  }, [props.errors]);

  function errorList() {
    return props.errors.map((err) => <li key={err.message}>{err.message}</li>);
  }
  return (
    <>
      {showAlert ? (
        <div
          className="flex p-5 mx-5 xl:mx-64  bg-red-200/70 backdrop-blur-sm rounded-lg dark:bg-red-200 absolute top-5  z-50"
          role="alert"
        >
          <IconAlert />
          <ListError errors={props.errors} />
          <CloseButtonError onClick={setShowAlert} />
        </div>
      ) : null}
    </>
  );
}
