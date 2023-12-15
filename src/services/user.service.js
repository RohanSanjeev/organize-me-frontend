import axios from "axios";

const API_URL = "https://organizeme-81hv.onrender.com/api/users/";

class UserService {

  listAllUsers() {
    return axios.get(API_URL + "list");
  }

  updateUser(id, username, email, password, address) {
    return axios.put(API_URL + "update", {
      id,
      username,
      email,
      password,
      address
    });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + "delete/" + userId);
  }
}

export default new UserService();
