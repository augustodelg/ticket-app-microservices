import axios from "axios";
import { useState } from "react";
import AppErrorPopUp from "../components/general/AppErrorPopUp";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      onSuccess && onSuccess();

      return response.data;
    } catch (error) {
      setErrors(<AppErrorPopUp errors={error.response.data.errors} />);
      throw error;
    }
  };

  return [doRequest, errors];
}
