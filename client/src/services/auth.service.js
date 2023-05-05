import api from "./api";
import TokenService from "./token.service";
import jwt_decode from "jwt-decode";


const register = (username, password) => {
  return api.post("/auth/signup", {
    username,
    password,
  });
};



const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const getCurrentUserId = () => { 
  const user = getCurrentUser();
  if (!user) {
    return null;
  }

  const decodedToken = jwt_decode(user.accessToken);
  return decodedToken.id;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserId,
};




export default AuthService;
