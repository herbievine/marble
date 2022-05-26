import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/User";
import { useMeLazyQuery } from "../generated/graphql";
import { useLoading } from "../hooks/useLoading";

export type UserProps = {
  isCompleted: boolean;
} & Partial<User>;

export type UserContext = [
  user?: UserProps,
  setUser?: React.Dispatch<React.SetStateAction<UserProps>>
];

export const UserContext = React.createContext<UserContext>([]);

const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<UserProps>({ isCompleted: false });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
