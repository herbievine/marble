import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { AuthProps } from "../../contexts/Auth";

interface SchoolProps {
  updateData: <Key extends keyof AuthProps>(
    key: Key,
    payload: AuthProps[Key]
  ) => void;
  values: AuthProps;
}

const School: React.FC<SchoolProps> = ({ updateData }) => {
  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSchoolId(DOMPurify.sanitize(value).replace(/[a-zA-Z]/g, ""));
  };

  const onClick = async () => {
    const schoolIdRegex = /^[0-9]{4}$/g;

    if (!schoolId) {
      return setError("School ID empty");
    } else if (!schoolIdRegex.test(schoolId)) {
      return setError("Invalid school ID");
    }

    updateData("schoolId", schoolId);
  };

  return (
    <Auth
      prompt="School ID:"
      placeholder="3872"
      defaultValue={schoolId}
      onChange={onChange}
      error={error}
      next={onClick}
    />
  );
};

export default School;
