import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import Auth from "../../layouts/Auth";
import { AuthFlowData } from "../AuthFlow";

interface ProfileProps {
  updateData: <Key extends keyof AuthFlowData>(
    key: Key,
    payload: AuthFlowData[Key]
  ) => void;
  values: AuthFlowData;
}

const Profile: React.FC<ProfileProps> = ({ updateData }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setUsername(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    const usernameRegex = /^[a-zA-Z0-9]\w+$/g;

    if (!username) {
      return setError("Username empty");
    } else if (!usernameRegex.test(username)) {
      return setError("Invalid username");
    }

    updateData("username", username);
  };

  return (
    <Auth
      prompt="Enter a username:"
      placeholder="Sponge Bob"
      defaultValue={username}
      onChange={onChange}
      error={error}
      next={onClick}
    />
  );
};

export default Profile;
