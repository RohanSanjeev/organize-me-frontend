import axios from "axios";

const API_URL = "https://organizeme-81hv.onrender.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
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

  register(id, username, email, password, roles, address) {
    return axios.post(API_URL + "signup", {
      id,
      username,
      email,
      password,
      roles,
      address
    });
  }

  listAllRoles() {
    return axios.get(API_URL + "listroles");
  }

}

export default new AuthService();
