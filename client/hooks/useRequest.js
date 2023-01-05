import axios from "axios";
import { useState } from "react";
import AppErrorPopUp from "../components/general/appErrorPopUp/AppErrorPopUp";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      const requestBody = { ...body, ...props}
      console.log(requestBody);
      const response = await axios[method](url,requestBody);
      
      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      // Estaria bueno que esto actualice un contexto y que esto haga mostrar el mensaje de erro, asi solo se pone en el layout
      setErrors(<AppErrorPopUp errors={error.response.data.errors} />);
      throw error;
    }
  };

  return [doRequest, errors];
}
