import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { AuthFlowData } from "../AuthFlow";
import Auth from "../../layouts/Auth";

interface SchoolProps {
  updateData: <Key extends keyof AuthFlowData>(
    key: Key,
    payload: AuthFlowData[Key]
  ) => void;
  values: AuthFlowData;
}

const School: React.FC<SchoolProps> = ({ updateData }) => {
  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSchoolId(DOMPurify.sanitize(value).toLowerCase());
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
