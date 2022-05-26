import { useContext } from "react";
import { LoadingContext } from "../contexts/Loading";

export interface UserHook {
  loading: LoadingContext[0];
  setLoading: LoadingContext[1];
}

const useLoading = (): UserHook => {
  const [loading, setLoading] = useContext(LoadingContext);

  if (!setLoading) {
    throw new Error("LoadingContext needs to be initialized");
  }

  return { loading, setLoading };
};

export { useLoading };
