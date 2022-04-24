import React, { useState } from "react";

export type GlobalError = {
  key: "school" | "email" | "username";
  message: string;
};

export type GlobalErrorContext = [
  globalError?: GlobalError,
  setGlobalError?: React.Dispatch<React.SetStateAction<GlobalError>>
];

export const GlobalErrorContext = React.createContext<GlobalErrorContext>([]);

const GlobalErrorProvider: React.FC<{}> = ({ children }) => {
  const [globalError, setGlobalError] = useState<GlobalError>();

  return (
    <GlobalErrorContext.Provider value={[globalError, setGlobalError]}>
      {children}
    </GlobalErrorContext.Provider>
  );
};

export default GlobalErrorProvider;
