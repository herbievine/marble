import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Email from "./auth/Email";
import Profile from "./auth/Profile";
import School from "./auth/School";
import Loader from "./Loader";

interface AuthFlowProps {}

const AuthFlow: React.FC<AuthFlowProps> = () => {
  const { auth } = useAuth();

  if (auth?.schoolId && auth?.emailPolicy && !auth?.isLoggedIn) {
    return <Email />;
  } else if (auth?.email && auth?.isLoggedIn && !auth?.username) {
    return <Profile />;
  }

  return <School />;
};

export default AuthFlow;
