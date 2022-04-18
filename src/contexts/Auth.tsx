import React, { useCallback, useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";
import { magic } from "../lib/magic";

export type AuthProps = {
  schoolId?: string;
  email?: string;
  didToken?: string;
  username?: string;
  loggedIn?: boolean;
};

export type AuthContext = [
  auth?: AuthProps,
  updateData?: <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => void
];

export const AuthContext = React.createContext<AuthContext>([]);

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>();
  const { setLoading } = useLoading();

  const updateData = <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => {
    setAuth((prev) => ({ ...prev, [key]: payload }));
  };

  const login = useCallback(
    async (payload: AuthProps) => {
      const { schoolId, email, loggedIn } = payload;

      if (schoolId && email && !loggedIn) {
        setLoading(true);

        const didToken = await magic().auth.loginWithMagicLink({ email });

        updateData("didToken", didToken);
        updateData("loggedIn", await magic().user.isLoggedIn());

        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    login(auth);
  }, [auth, login]);

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
    <AuthContext.Provider value={[auth, updateData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
