import axios from "axios";
import { toast } from "react-toastify";
import authHeader from "./auth-header";

//set default baseURL so when we use http request this will be add in front
//example: http.get("/users") will be http.get("http://localhost:5777/api/users") in development env
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  console.log("interceptor called");
  console.log(error.response.data);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Unexpected error occured");
    console.log("logging unexpected error", error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  delete: axios.delete,
  post: axios.post,
  put: axios.put,
  authHeader,
};
