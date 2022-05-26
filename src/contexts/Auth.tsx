import { FetchResult } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  GetSchoolLazyQueryHookResult,
  GetSchoolQueryResult,
  useGetSchoolLazyQuery,
  useLoginMutation,
  useMeLazyQuery,
  useUpdateUserMutation,
} from "../generated/graphql";
import { useAuthFlow } from "../hooks/useAuthFlow";
import { useLoading } from "../hooks/useLoading";
import { useUser } from "../hooks/useUser";
import { magic } from "../lib/magic";
import { User } from "../types/User";
import { AuthFlowSteps } from "./AuthFlow";

type External = {
  email?: string;
  schoolId?: string;
  username?: string;
};

type Internal = {
  emailPolicy?: string;
  hasUsername?: boolean;
};

export type AuthProps = {
  external: External;
  internal: Internal;
  user: Partial<User>;
};

export type AuthContext = [
  auth?: AuthProps,
  updateExternal?: <Key extends keyof External>(
    key: Key,
    payload: External[Key]
  ) => void,
  onSchoolSubmit?: (schoolId: string) => Promise<void>,
  onEmailSubmit?: (email: string, schoolId: string) => Promise<void>,
  onUsernameSubmit?: (username: string) => Promise<void>
];

export const AuthContext = React.createContext<AuthContext>([]);

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthProps>({
    external: {},
    internal: {},
    user: {},
  });
  const [getSchool] = useGetSchoolLazyQuery();
  const [login] = useLoginMutation();
  const [update] = useUpdateUserMutation();
  const [me] = useMeLazyQuery();
  const { setUser } = useUser();
  const { setAuthFlow } = useAuthFlow();
  const { setLoading } = useLoading();

  useEffect(() => console.log("Auth:", { auth }), [auth]);

  const updateExternal = <Key extends keyof External>(
    key: Key,
    payload: External[Key]
  ) => {
    setAuth((prev) => ({ ...prev, external: { [key]: payload } }));
  };

  const updateAuth = <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => {
    setAuth((prev) => ({ ...prev, [key]: payload }));
  };

  const handleMe = useCallback(async () => {
    setLoading(true);

    try {
      const data = await me();

      if (!data?.error && data?.data?.me?.user?.username) {
        const { uuid, username, amount } = data.data.me.user;

        setUser({ uuid, username, amount, isCompleted: true });
      } else if (!data?.error && data?.data?.me?.user?.uuid) {
        const { uuid, amount } = data.data.me.user;

        updateAuth("user", { uuid, amount });
        updateAuth("internal", { hasUsername: false });
        setAuthFlow({ step: AuthFlowSteps.Profile });
      }
    } catch {}

    setLoading(false);
  }, [me, setAuthFlow, setLoading, setUser]);

  const onSchoolSubmit = useCallback(
    async (schoolId: string) => {
      setLoading(true);

      try {
        const data = await getSchool({ variables: { schoolId } });

        if (data?.error || !data?.data) {
          return setAuthFlow({
            step: AuthFlowSteps.School,
            error: "Invalid School ID",
          });
        }

        updateAuth("internal", {
          emailPolicy: data.data.getSchool.emailPolicy,
        });
        setAuthFlow({ step: AuthFlowSteps.Email });
      } catch {
        return setAuthFlow({
          step: AuthFlowSteps.School,
          error: "Invalid School ID",
        });
      }

      setLoading(false);
    },
    [getSchool, setAuthFlow, setLoading]
  );

  const onEmailSubmit = useCallback(
    async (email: string, schoolId: string) => {
      setLoading(true);

      try {
        const didToken = await magic().auth.loginWithMagicLink({ email });

        const data = await login({
          variables: { schoolId },
          context: { headers: { Authorization: "Bearer " + didToken } },
        });

        if (!data?.errors && data?.data?.login?.user?.username) {
          const { uuid, username, amount } = data.data.login.user;

          console.log(data.data.login.user);

          setUser({ uuid, username, amount, isCompleted: true });
        } else if (!data?.errors && data?.data?.login?.user?.uuid) {
          const { uuid, amount } = data.data.login.user;

          updateAuth("user", { uuid, amount });
          updateAuth("internal", { hasUsername: false });
          setAuthFlow({ step: AuthFlowSteps.Profile });
        }
      } catch {}

      setLoading(false);
    },
    [login, setAuthFlow, setLoading, setUser]
  );

  const onUsernameSubmit = useCallback(
    async (username: string) => {
      setLoading(true);

      try {
        const data = await update({
          variables: { username },
        });

        if (!data?.errors && data?.data?.updateUser?.user?.username) {
          const { uuid, username, amount } = data.data.updateUser.user;

          setUser({ uuid, username, amount, isCompleted: true });
        } else if (!data?.errors && data?.data?.updateUser?.user?.uuid) {
          setAuthFlow({
            step: AuthFlowSteps.Profile,
            error: "Error creating username",
          });
        }
      } catch {}

      setLoading(false);
    },
    [setAuthFlow, setLoading, setUser, update]
  );

  useEffect(() => {
    handleMe();
  }, []);

  return (
    <AuthContext.Provider
      value={[
        auth,
        updateExternal,
        onSchoolSubmit,
        onEmailSubmit,
        onUsernameSubmit,
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
