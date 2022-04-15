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

  const updateData = <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => {
    setData((prev) => ({ ...prev, [key]: payload }));
  };

  if (!data?.schoolId) {
    return <School updateData={updateData} values={data} />;
  } else if (!data?.username) {
    return <Profile updateData={updateData} values={data} />;
  } else if (!data?.didToken) {
    return <Email updateData={updateData} values={data} />;
  }

  return <Loader className="w-full flex justify-center" />;
};

export default AuthFlow;
