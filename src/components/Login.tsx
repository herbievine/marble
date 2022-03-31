import React, { useEffect, useState } from "react";
import Credentials from "./auth/Credentials";
import Profile from "./auth/Profile";
import Verify from "./auth/Verify";

interface LoginProps {}

export type LoginData = {
  id?: string;
  username?: string;
  code?: number;
  codeFromEmail?: number;
};

const Login: React.FC<LoginProps> = () => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState<LoginData>({});

  useEffect(() => console.log(count, data), [count, data]);

  const next = () => {
    setCount((prev) => prev + 1);
  };

  const back = () => {
    setCount((prev) => prev - 1);
  };

  const updateData = <Key extends keyof LoginData>(
    key: Key,
    payload: LoginData[Key]
  ) => {
    setData((prev) => ({ ...prev, [key]: payload }));
  };

  const sendEmail = () => {
    const code = 827174;

    setData((prev) => ({ ...prev, code }));

    console.log(`Code is ${code}`);
  };

  switch (count) {
    case 1:
      return <Credentials next={next} updateData={updateData} values={data} />;
    case 2:
      return (
        <Verify
          next={next}
          back={back}
          updateData={updateData}
          sendEmail={sendEmail}
          values={data}
        />
      );
    case 3:
      return (
        <Profile
          next={next}
          back={back}
          updateData={updateData}
          values={data}
        />
      );
    default:
      break;
  }
};

export default Login;
