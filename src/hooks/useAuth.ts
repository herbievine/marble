import { useContext } from "react";
import { AuthContext, AuthProps } from "../contexts/Auth";

export interface AuthHook {
  auth: Partial<AuthProps>;
}

const useAuth = (): AuthHook => {
  const [auth] = useContext(AuthContext);

  // if (!findUser) {
  //   throw new Error("UserContext needs to be initialized");
  // }

  return { auth };
};

export { useAuth };
