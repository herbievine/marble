import React, { useState } from "react";

export type ModalContextInterface = [
  modal?: React.ReactNode,
  setModal?: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>
];

export const ModalContext = React.createContext<ModalContextInterface>([]);

const ModalProvider: React.FC<{}> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactNode>();

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
