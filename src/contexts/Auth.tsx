import React, { useCallback, useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";
import { parseLeaderboard } from "../lib/parseLeaderboard";
import { getItem, setItem } from "../lib/storage";

type Auth = { schoolId?: string; didToken?: string; username?: string };

export type AuthContext = [auth?: Auth];

export const AuthContext = React.createContext<AuthContext>([]);

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>();
  const { setLoading } = useLoading();

  // const findCookie = useCallback(
  //   async (): Promise<boolean> => {
  //     setLoading(true);

  //     setLoading(false);

  //     return !!foundAuth;
  //   },
  //   [setLoading]
  // );

  // useEffect(() => {
  //   findCookie();
  // }, [findCookie]);

  return <AuthContext.Provider value={[auth]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
