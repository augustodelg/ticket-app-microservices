import { Fragment, useState } from "react";
import AppButton from "../AppButton";
import CloseButtonError from "../appErrorPopUp/components/closeButtonError";

export default function AppModal(props) {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
    props.buttomOnClick && props.buttomOnClick();
  }

  return (
    <Fragment>
      <AppButton
        disabled={props.disabledButtom}
        className={"h-12 w-full md:w-60"}
        text={props.textButton}
        onClick={() => handleOpenModal()}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative rounded-3xl  w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-3xl  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex   items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl rounded-3xl  font-semibold">
                    {props.title}
                  </h3>
                  <CloseButtonError onClick={() => setShowModal(false)} />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{props.children}</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl  opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Fragment>
  );
}
