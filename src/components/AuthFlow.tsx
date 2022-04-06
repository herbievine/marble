import React, { useEffect, useState } from "react";
import Email from "./auth/Email";
import Profile from "./auth/Profile";
import School from "./auth/School";
import Loader from "./Loader";

interface AuthFlowProps {}

export type AuthFlowData = {
  schoolId?: string;
  didToken?: string;
  username?: string;
};

const AuthFlow: React.FC<AuthFlowProps> = () => {
  const [data, setData] = useState<AuthFlowData>(null);

  useEffect(() => console.log(data), [data]);

  const updateData = <Key extends keyof AuthFlowData>(
    key: Key,
    payload: AuthFlowData[Key]
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
