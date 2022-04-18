import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { useAuth } from "../../hooks/useAuth";

interface CredentialsProps {}

const Credentials: React.FC<CredentialsProps> = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { updateData } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setEmail(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    // const emailRegex = /^[a-z]{2}[0-9]{6}@hc.ac.je$/g;
    const emailRegex = /^[a-z]{10}@gmail.com$/g;

    if (!email) {
      return setError("Email empty");
    } else if (!emailRegex.test(email)) {
      return setError("Invalid email");
    }

    updateData("email", email);
  };

  return (
    <Auth
      prompt="Email or ID:"
      placeholder="xy123456@hc.ac.je"
      defaultValue={email}
      onChange={onChange}
      error={error}
      next={onClick}
    />
  );
};

export default Credentials;
