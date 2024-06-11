import { axios } from "../config";

export async function signinUser(userData: any) {
  const response = await axios.post("/auth/signin", userData);
  return response.data;
}

export async function signupUser(signupUserDetail: any) {
  const response = await axios.post("/auth/signup", signupUserDetail);
  return response.data;
}
