import axios from "axios";

export default axios.create({
  baseURL: "http://51.142.109.141/api",
  headers: {
    "Content-type": "application/json"
  }
});