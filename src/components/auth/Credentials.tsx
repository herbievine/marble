import React, { useState } from "react";
import { useUser } from "../../hooks/useUser";
import DOMPurify from "dompurify";
import { LoginData } from "../Login";
import AuthFlow from "../../layouts/AuthFlow";

interface CredentialsProps {
  next: () => void;
  updateData: <Key extends keyof LoginData>(
    key: Key,
    payload: LoginData[Key]
  ) => void;
  values: LoginData;
}

const Credentials: React.FC<CredentialsProps> = ({
  next,
  updateData,
  values,
}) => {
  const [email, setEmail] = useState(values?.id ?? "");
  const [error, setError] = useState("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setEmail(DOMPurify.sanitize(value).toLowerCase());
  };

  const onClick = async () => {
    const emailRegex = /^[a-z]{2}[0-9]{6}(@hc.ac.je)?$/g;

    if (!email) {
      return setError("Email empty");
    } else if (!emailRegex.test(email)) {
      return setError("Invalid email");
    }

    const id = email.split("@")[0];

    updateData("id", id);
    next();
  };

  return (
    <AuthFlow
      prompt="Email or ID:"
      placeholder="xy123456@hc.ac.je"
      defaultValue={values?.id}
      onChange={onChange}
      error={error}
      next={onClick}
    />
  );
};

export default Credentials;
