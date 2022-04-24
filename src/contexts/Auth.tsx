import { FetchResult } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  GetSchoolMutation,
  useGetSchoolMutation,
  useLoginMutation,
  useUpdateUserMutation,
} from "../generated/graphql";
import { useGlobalError } from "../hooks/useGlobalError";
import { useLoading } from "../hooks/useLoading";
import { useUser } from "../hooks/useUser";
import { magic } from "../lib/magic";
import { setItem } from "../lib/storage";

export type AuthProps = {
  schoolId?: string;
  emailPolicy?: string;
  email?: string;
  didToken?: string;
  username?: string;
  hasUsername?: boolean;
  isLoggedIn: boolean;
  isComplete: boolean;
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
  const [auth, setAuth] = useState<AuthProps>({
    isLoggedIn: false,
    hasUsername: false,
    isComplete: false,
  });
  const [getSchool] = useGetSchoolMutation();
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  const { user, setUser } = useUser();
  const { setGlobalError } = useGlobalError();
  const { setLoading } = useLoading();

  useEffect(() => console.log("Objects:", { auth, user }), [auth, user]);

  const updateData = <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => {
    setAuth((prev) => ({ ...prev, [key]: payload }));
  };

  const executeFunction = useCallback(
    async (fn: Function, payload?: AuthProps) => {
      setLoading(true);

      await fn(payload);

      setLoading(false);
    },
    [setLoading]
  );

  const loadUser = useCallback(async () => {
    const isLoggedIn = await magic().user.isLoggedIn();

    if (isLoggedIn) {
      const didToken = await magic().user.getIdToken();

      if (didToken) {
        updateData("isLoggedIn", isLoggedIn);
        updateData("didToken", didToken);
      }
    }
  }, []);

  const getEmailPolicy = useCallback(
    async (payload: AuthProps) => {
      const { schoolId } = payload;

      let data: FetchResult<
        GetSchoolMutation,
        Record<string, any>,
        Record<string, any>
      >;

      try {
        data = await getSchool({ variables: { schoolId } });
      } catch {
        return setGlobalError({ key: "school", message: "Invalid school ID" });
      }

      if (data?.errors || !data?.data) {
        return setGlobalError({ key: "school", message: "Invalid School ID" });
      }

      updateData("emailPolicy", data.data.getSchool.emailPolicy);
    },
    [getSchool, setGlobalError]
  );

  const loginWithMagic = useCallback(
    async (payload: AuthProps) => {
      const { schoolId, email } = payload;

      const didToken = await magic().auth.loginWithMagicLink({ email });

      setItem("token", didToken);

      try {
        const data = await login({ variables: { schoolId } });

        if (data?.data.login.user.username) {
          updateData("username", data.data.login.user.username);
          updateData("hasUsername", true);
        }
      } catch (e) {
        console.log(e);
      }

      updateData("didToken", didToken);
      updateData("isLoggedIn", await magic().user.isLoggedIn());
    },
    [login]
  );

  const updateUsername = useCallback(
    async (payload: AuthProps) => {
      const { username } = payload;

      try {
        const data = await updateUser({ variables: { username } });

        if (data?.data?.updateUser.user.username) {
          updateData("username", data.data.updateUser.user.username);
          updateData("hasUsername", true);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [updateUser]
  );

  useEffect(() => {
    // executeFunction(loadUser);

    if (auth?.schoolId && !auth?.emailPolicy) {
      executeFunction(getEmailPolicy, auth);
    } else if (auth?.schoolId && auth?.email && !auth?.didToken) {
      executeFunction(loginWithMagic, auth);
    } else if (!auth?.hasUsername && auth?.username) {
      executeFunction(updateUsername, auth);
    }
  }, [
    auth,
    executeFunction,
    getEmailPolicy,
    loadUser,
    loginWithMagic,
    updateUsername,
  ]);

  return (
    <AuthContext.Provider value={[auth, updateData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
