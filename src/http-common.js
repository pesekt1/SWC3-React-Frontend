import axios from "axios";

export default axios.create({
  //this should be improved: environment variable - DEV is localhost, PROD is cloud
  //baseURL: "http://localhost:5557/api",
  //baseURL: "https://swc3-spring-boot-server.herokuapp.com/api",
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
