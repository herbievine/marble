import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { useAuth } from "../../hooks/useAuth";
import { useGlobalError } from "../../hooks/useGlobalError";

interface CredentialsProps {}

const Credentials: React.FC<CredentialsProps> = () => {
  const [email, setEmail] = useState("");
  const { globalError, setGlobalError } = useGlobalError();
  const { updateData, auth } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setEmail(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    const emailRegex = new RegExp(auth.emailPolicy);

    if (!email) {
      return setGlobalError({ key: "email", message: "Email empty" });
    } else if (!emailRegex.test(email)) {
      return setGlobalError({ key: "email", message: "Invalid email" });
    }

    updateData("email", email);
  };

  return (
    <Auth
      prompt="Email or ID:"
      placeholder="xy123456@hc.ac.je"
      defaultValue={email}
      onChange={onChange}
      error={globalError?.key === "email" ? globalError.message : ""}
      next={onClick}
    />
  );
};

export default Credentials;
