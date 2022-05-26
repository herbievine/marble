import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { useAuth } from "../../hooks/useAuth";
import { useAuthFlow } from "../../hooks/useAuthFlow";
import { AuthFlowSteps } from "../../contexts/AuthFlow";

interface CredentialsProps {}

const Credentials: React.FC<CredentialsProps> = () => {
  const [email, setEmail] = useState("");
  const { authFlow, setAuthFlow } = useAuthFlow();
  const { updateExternal, auth, onEmailSubmit } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setEmail(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    const emailRegex = new RegExp(auth.internal.emailPolicy);

    if (!email) {
      return setAuthFlow({
        step: AuthFlowSteps.Email,
        error: "Email empty",
      });
    } else if (!emailRegex.test(email)) {
      return setAuthFlow({
        step: AuthFlowSteps.Email,
        error: "Invalid email",
      });
    }

    updateExternal("email", email);

    const { schoolId } = auth.external;

    onEmailSubmit(email, schoolId);
  };

  return (
    <Auth
      prompt="Email or ID:"
      placeholder="xy123456@hc.ac.je"
      defaultValue={email}
      onChange={onChange}
      error={authFlow.error}
      next={onClick}
    />
  );
};

export default Credentials;
