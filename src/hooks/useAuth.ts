import { useContext } from "react";
import { AuthContext, AuthProps } from "../contexts/Auth";

export interface AuthHook {
  auth: AuthContext[0];
  updateExternal: AuthContext[1];
  onSchoolSubmit: AuthContext[2];
  onEmailSubmit: AuthContext[3];
  onUsernameSubmit: AuthContext[4];
}

const useAuth = (): AuthHook => {
  const [
    auth,
    updateExternal,
    onSchoolSubmit,
    onEmailSubmit,
    onUsernameSubmit,
  ] = useContext(AuthContext);

  if (!updateExternal) {
    throw new Error("UserContext needs to be initialized");
  }

  return {
    auth,
    updateExternal,
    onSchoolSubmit,
    onEmailSubmit,
    onUsernameSubmit,
  };
};

export { useAuth };
