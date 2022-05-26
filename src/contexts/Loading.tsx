import React, { useState } from "react";

export type LoadingContext = [
  loading?: boolean,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
];

export const LoadingContext = React.createContext<LoadingContext>([]);

const LoadingProvider: React.FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
