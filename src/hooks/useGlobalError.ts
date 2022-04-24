import { useContext } from "react";
import { GlobalErrorContext } from "../contexts/GlobalError";

export interface UserHook {
  globalError: GlobalErrorContext[0];
  setGlobalError: GlobalErrorContext[1];
}

const useGlobalError = (): UserHook => {
  const [globalError, setGlobalError] = useContext(GlobalErrorContext);

  if (!setGlobalError) {
    throw new Error("GlobalErrorContext needs to be initialized");
  }

  return { globalError, setGlobalError };
};

export { useGlobalError };
