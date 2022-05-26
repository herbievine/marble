import { useContext } from "react";
import { AuthFlowContext } from "../contexts/AuthFlow";

export interface UserHook {
  authFlow: AuthFlowContext[0];
  setAuthFlow: AuthFlowContext[1];
}

const useAuthFlow = (): UserHook => {
  const [authFlow, setAuthFlow] = useContext(AuthFlowContext);

  if (!setAuthFlow) {
    throw new Error("AuthFlowContext needs to be initialized");
  }

  return { authFlow, setAuthFlow };
};

export { useAuthFlow };
