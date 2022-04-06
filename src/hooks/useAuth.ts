import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

export interface AuthHook {
  auth: AuthContext[0];
}

const useAuth = (): AuthHook => {
  const [auth] = useContext(AuthContext);

  // if (!findUser) {
  //   throw new Error("UserContext needs to be initialized");
  // }

  return { auth };
};

export { useAuth };
