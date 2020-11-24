import axios from "axios";

export default axios.create({
  //environment variable - development is localhost, production is cloud
  //REACT_APP_API_URL is taken from env.development or env.production file
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
