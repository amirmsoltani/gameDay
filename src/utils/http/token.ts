import jwtDecode from "jwt-decode";
import { FirebaseToken } from "src/@types/auth.type";

export const isTokenExpired = (token: string | undefined): boolean => {
  if (!token) return true;
  const decoded = jwtDecode<FirebaseToken>(token);
  console.log(decoded);
  if (decoded.exp < Date.now() / 1000) {
    console.log("decoded");
    return true;
  }
  return false;
};
