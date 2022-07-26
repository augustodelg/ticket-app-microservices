import AppInput from "../components/general/AppInput";
import { useState} from "react";


export default function useInput(opts) {
  const [value, setValue] = useState("");
  const input = (
    <AppInput value={value} onChange={(e) => setValue(e.target.value)} {...opts}/>
  );
  return [value, input];
}
