import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import AuthFlow from "../../layouts/AuthFlow";
import { LoginData } from "../Login";

interface VerifyProps {
  next: () => void;
  back: () => void;
  updateData: <Key extends keyof LoginData>(
    key: Key,
    payload: LoginData[Key]
  ) => void;
  sendEmail: () => void;
  values: LoginData;
}

const Verify: React.FC<VerifyProps> = ({
  next,
  back,
  updateData,
  sendEmail,
  values,
}) => {
  const [codeFromEmail, setCodeFromEmail] = useState<number>(
    values?.codeFromEmail
  );
  const [error, setError] = useState("");

  useEffect(() => {
    !values.code && sendEmail();
  }, [values.code, sendEmail]);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setCodeFromEmail(+DOMPurify.sanitize(value));
  };

  const onClick = async () => {
    const codeRegex = /^[0-9]{6}$/g;

    if (!values.code) {
      return setError("Code empty");
    } else if (
      !codeRegex.test(codeFromEmail.toString()) ||
      codeFromEmail !== values.code
    ) {
      return setError("Invalid code");
    }

    updateData("codeFromEmail", codeFromEmail);
    next();
  };

  return (
    <AuthFlow
      prompt="We just sent you a code:"
      placeholder="123456"
      defaultValue={values?.codeFromEmail?.toString()}
      onChange={onChange}
      error={error}
      back={back}
      next={onClick}
    />
  );
};

export default Verify;
