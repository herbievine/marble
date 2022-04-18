import { useContext } from "react";
import { AuthContext, AuthProps } from "../contexts/Auth";

export interface AuthHook {
  auth: AuthContext[0];
  updateData: AuthContext[1];
}

const useAuth = (): AuthHook => {
  const [auth, updateData] = useContext(AuthContext);

  // if (!findUser) {
  //   throw new Error("UserContext needs to be initialized");
  // }

  return { auth, updateData };
};

export { useAuth };
