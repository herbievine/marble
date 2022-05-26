import React, { useEffect, useState } from "react";

export enum AuthFlowSteps {
  School,
  Email,
  Profile,
  Success,
}

type AuthFlowProps = {
  step: AuthFlowSteps;
  error?: string;
};

export type AuthFlowContext = [
  authFlow?: AuthFlowProps,
  setAuthFlow?: React.Dispatch<React.SetStateAction<AuthFlowProps>>
];

export const AuthFlowContext = React.createContext<AuthFlowContext>([]);

const AuthFlowProvider: React.FC<{}> = ({ children }) => {
  const [authFlow, setAuthFlow] = useState<AuthFlowProps>({
    step: AuthFlowSteps.School,
  });

  useEffect(() => console.log("AuthFlow:", { authFlow }), [authFlow]);

  return (
    <AuthFlowContext.Provider value={[authFlow, setAuthFlow]}>
      {children}
    </AuthFlowContext.Provider>
  );
};

export default AuthFlowProvider;
