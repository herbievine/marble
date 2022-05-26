import { useContext } from "react";
import { UserContext } from "../contexts/User";

export interface UserHook {
  user: UserContext[0];
  setUser: UserContext[1];
}

const useUser = (): UserHook => {
  const [user, setUser] = useContext(UserContext);

  if (!setUser) {
    throw new Error("UserContext needs to be initialized");
  }

  return { user, setUser };
};

export { useUser };
