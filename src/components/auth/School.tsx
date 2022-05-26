import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { useAuth } from "../../hooks/useAuth";
import { FetchResult } from "@apollo/client";
import { useAuthFlow } from "../../hooks/useAuthFlow";
import { AuthFlowSteps } from "../../contexts/AuthFlow";

interface SchoolProps {}

const School: React.FC<SchoolProps> = () => {
  const [schoolId, setSchoolId] = useState("");
  const { authFlow, setAuthFlow } = useAuthFlow();
  const { updateExternal, onSchoolSubmit } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSchoolId(DOMPurify.sanitize(value).replace(/[a-zA-Z]/g, ""));
  };

  const onClick = async () => {
    const schoolIdRegex = /^[0-9]{4}$/g;

    if (!schoolId) {
      return setAuthFlow({
        step: AuthFlowSteps.School,
        error: "School ID empty",
      });
    } else if (!schoolIdRegex.test(schoolId)) {
      return setAuthFlow({
        step: AuthFlowSteps.School,
        error: "Invalid school ID",
      });
    }

    updateExternal("schoolId", schoolId);
    onSchoolSubmit(schoolId);
  };

  return (
    <Auth
      prompt="School ID:"
      placeholder="3872"
      defaultValue={schoolId}
      onChange={onChange}
      error={authFlow.error}
      next={onClick}
    />
  );
};

export default School;
