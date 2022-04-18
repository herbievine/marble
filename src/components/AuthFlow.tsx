import React, { useEffect, useState } from "react";
import { AuthProps } from "../contexts/Auth";
import Email from "./auth/Email";
import Profile from "./auth/Profile";
import School from "./auth/School";
import Loader from "./Loader";

interface AuthFlowProps {}

const AuthFlow: React.FC<AuthFlowProps> = () => {
  const [data, setData] = useState<AuthProps>(null);

  useEffect(() => console.log(data), [data]);

  if (!data?.schoolId) {
    return <School />;
  } else if (!data?.email) {
    return <Email />;
  } else if (!data?.username) {
    return <Profile />;
  }

  return <Loader className="w-full flex justify-center" />;
};

export default AuthFlow;
