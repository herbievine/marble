import React, { useState } from "react";
import { useLoading } from "../hooks/useLoading";

export type AuthProps = {
  schoolId: string;
  didToken: string;
  username: string;
};

export type AuthContext = [
  auth?: AuthProps,
  login?: (payload: AuthProps) => Promise<void>
];

export const AuthContext = React.createContext<AuthContext>([]);

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>();
  const { setLoading } = useLoading();

  const login = async (payload: AuthProps) => {
    setLoading(true);
  };

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

  return (
    <AuthContext.Provider value={[auth, login]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
