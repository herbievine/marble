import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { magic } from "../../lib/magic";
import { useLoading } from "../../hooks/useLoading";
import { AuthProps } from "../../contexts/Auth";

interface CredentialsProps {
  updateData: <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => void;
  values: AuthProps;
}

const Credentials: React.FC<CredentialsProps> = ({ updateData }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

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

    setLoading(true);

    const didToken = await magic().auth.loginWithMagicLink({ email });

    setLoading(false);

    updateData("didToken", didToken);
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
