import baseAxios from "axios";
import { getCookie } from "../utils/helpers";

export const axios = baseAxios.create({
  baseURL: "http://localhost:3001",
});

axios.interceptors.request.use(function (config) {
  const authUser = getCookie("auth-user");
  if (authUser) {
    const authUserData = JSON.parse(authUser);
    config.headers["Authorization"] = "Bearer " + authUserData.accessToken;
  }

  return config;
});
