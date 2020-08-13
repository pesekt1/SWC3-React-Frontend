import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5557/api",
  //baseURL: "https://swc3-spring-boot-server.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
