import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "../types/User";

export type UserContext = [
  user?: User,
  setUser?: React.Dispatch<React.SetStateAction<User>>
];

export const UserContext = React.createContext<UserContext>([]);

const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
