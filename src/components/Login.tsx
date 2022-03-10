import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import DOMPurify from "dompurify";

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { findUser } = useUser();

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

    const attempt = await findUser(id);

    if (!attempt) {
      return setError("User not found");
    }
  };

  return (
    <div className={className}>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <label htmlFor="input">Email:</label>
            {error && <p className="text-red-400">{error}</p>}
          </div>
          <input
            id="input"
            className="w-full mt-2 px-4 py-3 bg-neutral-900 border-2 border-neutral-200"
            type="text"
            placeholder="ab123456@hc.ac.je"
            onChange={onChange}
          />
        </div>
        <button className="mt-6" onClick={onClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
