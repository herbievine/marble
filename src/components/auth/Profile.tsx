import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AuthProps } from "../../contexts/Auth";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalError } from "../../hooks/useGlobalError";
import Auth from "../../layouts/Auth";
import { magic } from "../../lib/magic";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [username, setUsername] = useState("");
  const { globalError, setGlobalError } = useGlobalError();
  const { updateData } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setUsername(DOMPurify.sanitize(value));
  };

  const onClick = async () => {
    const usernameRegex = /^[a-zA-Z0-9]\w+$/g;

    if (!username) {
      return setGlobalError({ key: "username", message: "Username empty" });
    } else if (!usernameRegex.test(username)) {
      return setGlobalError({ key: "username", message: "Invalid username" });
    }

    updateData("username", username);
  };

  return (
    <Auth
      prompt="Enter a username:"
      placeholder="Sponge Bob"
      defaultValue={username}
      onChange={onChange}
      error={globalError?.key === "username" ? globalError.message : ""}
      next={onClick}
    />
  );
};

export default Profile;
