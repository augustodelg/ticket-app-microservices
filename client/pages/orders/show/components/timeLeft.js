import { useEffect, useState } from "react";

const findTimeLeft = (expireAt, callBack) => {
  const msLeft = new Date(expireAt) - new Date();
  const minutes = Math.floor((msLeft / 1000 / 60) << 0);
  const seconds = Math.floor((msLeft / 1000) % 60);
  callBack({ minutes, seconds });
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export default function TimeLeft(props) {
  let setTimeOut;
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  const findTimeSet = () => {
    findTimeLeft(props.expireAt, setTimeLeft);
  };


  useEffect(() => {
    findTimeSet();
    if (new Date(props.expireAt).getTime() < new Date().getTime()) {
      props.actionTimeOut();
    } else {
      setTimeOut = setInterval(
        () => props.actionTimeOut(),
        new Date(props.expireAt) - new Date()
      );
      setInterval(findTimeSet, 100);
    }
    return () => clearInterval(setTimeOut);
  }, []);

  return (
    <p
      className={`${
        timeLeft.minutes < 1 && "text-red-400"
      } text-9xl font-extrabold`}
    >{`${padTo2Digits(timeLeft.minutes)}:${padTo2Digits(timeLeft.seconds)}`}</p>
  );
}
