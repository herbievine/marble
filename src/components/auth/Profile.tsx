import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AuthProps } from "../../contexts/Auth";
import { AuthFlowSteps } from "../../contexts/AuthFlow";
import { useAuth } from "../../hooks/useAuth";
import { useAuthFlow } from "../../hooks/useAuthFlow";
import Auth from "../../layouts/Auth";
import { magic } from "../../lib/magic";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [username, setUsername] = useState("");
  const { authFlow, setAuthFlow } = useAuthFlow();
  const { updateExternal, onUsernameSubmit } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setUsername(DOMPurify.sanitize(value));
  };

  const onClick = async () => {
    const usernameRegex = /^[a-zA-Z0-9]\w+$/g;

    if (!username) {
      return setAuthFlow({
        step: AuthFlowSteps.Profile,
        error: "Username empty",
      });
    } else if (!usernameRegex.test(username)) {
      return setAuthFlow({
        step: AuthFlowSteps.Profile,
        error: "Invalid username",
      });
    }

    updateExternal("username", username);
    onUsernameSubmit(username);
  };

  return (
    <Auth
      prompt="Enter a username:"
      placeholder="Sponge Bob"
      defaultValue={username}
      onChange={onChange}
      error={authFlow.error}
      next={onClick}
    />
  );
};

export default Profile;
