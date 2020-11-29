//import axios from "axios";
import http from "../services/httpService";

//const API_URL = "http://localhost:5557/api/auth/";

class AuthService {
  login(username, password) {
    return http
      .post("auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    //return axios.post(API_URL + "signup", {
    return http.post("auth/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
