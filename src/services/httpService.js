import axios from "axios";
import { toast } from "react-toastify";

export function setJwt(jwt) {
  //if user is not logged in then this header will be undefined
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

//set default baseURL so when we use http request this will be add in front
//example: http.get("/users") will be http.get("http://localhost:3900/api/users") in development env
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  console.log("interceptor called");
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
  setJwt
};
