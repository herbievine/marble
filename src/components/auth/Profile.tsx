import DOMPurify from "dompurify";
import React, { useState } from "react";
import AuthFlow from "../../layouts/AuthFlow";
import { LoginData } from "../Login";

interface ProfileProps {
  next: () => void;
  back: () => void;
  updateData: <Key extends keyof LoginData>(
    key: Key,
    payload: LoginData[Key]
  ) => void;
  values: LoginData;
}

const Profile: React.FC<ProfileProps> = ({
  next,
  back,
  updateData,
  values,
}) => {
  const [username, setUsername] = useState(values?.username ?? "");
  const [error, setError] = useState("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setUsername(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    const emailRegex = /^[a-zA-Z0-9]\w+$/g;

    if (!username) {
      return setError("Username empty");
    } else if (!emailRegex.test(username)) {
      return setError("Invalid username");
    }

    updateData("username", username);
    next();
  };

  return (
    <AuthFlow
      prompt="Enter a username:"
      placeholder="Sponge Bob"
      defaultValue={values?.username}
      onChange={onChange}
      error={error}
      back={back}
      next={onClick}
    />
  );
};

export default Profile;
