import { useContext } from "react";
import { UserContext } from "../contexts/User";

export interface UserHook {
  user: UserContext[0];
  findUser: UserContext[1];
  loading: UserContext[2];
}

const useUser = (): UserHook => {
  const [user, findUser, loading] = useContext(UserContext);

  if (!findUser) {
    throw new Error("UserContext needs to be initialized");
  }

  return { user, findUser, loading };
};

export { useUser };
