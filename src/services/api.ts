import axios from "axios";

export const api = axios.create({
  baseURL: "https://encontro-api.herokuapp.com/",
});
