import React, { useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../../layouts/Auth";
import { useAuth } from "../../hooks/useAuth";
import {
  GetSchoolMutation,
  useGetSchoolMutation,
} from "../../generated/graphql";
import { FetchResult } from "@apollo/client";
import { useGlobalError } from "../../hooks/useGlobalError";

interface SchoolProps {}

const School: React.FC<SchoolProps> = () => {
  const [schoolId, setSchoolId] = useState("");
  const { globalError, setGlobalError } = useGlobalError();
  const { updateData } = useAuth();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setSchoolId(DOMPurify.sanitize(value).replace(/[a-zA-Z]/g, ""));
  };

  const onClick = async () => {
    const schoolIdRegex = /^[0-9]{4}$/g;

    if (!schoolId) {
      return setGlobalError({ key: "school", message: "School ID empty" });
    } else if (!schoolIdRegex.test(schoolId)) {
      return setGlobalError({ key: "school", message: "Invalid school ID" });
    }

    updateData("schoolId", schoolId);
  };

  return (
    <Auth
      prompt="School ID:"
      placeholder="3872"
      defaultValue={schoolId}
      onChange={onChange}
      error={globalError?.key === "school" ? globalError.message : ""}
      next={onClick}
    />
  );
};

export default School;
