import React, { useEffect, useState } from "react";
import { AuthFlowSteps } from "../contexts/AuthFlow";
import { useAuth } from "../hooks/useAuth";
import { useAuthFlow } from "../hooks/useAuthFlow";
import Email from "./auth/Email";
import Profile from "./auth/Profile";
import School from "./auth/School";
import Loader from "./Loader";

interface AuthFlowProps {}

const AuthFlow: React.FC<AuthFlowProps> = () => {
  const { authFlow } = useAuthFlow();

  if (authFlow.step === AuthFlowSteps.Email) {
    return <Email />;
  } else if (authFlow.step === AuthFlowSteps.Profile) {
    return <Profile />;
  }

  return <School />;
};

export default AuthFlow;
