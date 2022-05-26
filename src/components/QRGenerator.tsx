import React from "react";
import { useModal } from "../hooks/useModal";
import QRCode from "react-qr-code";

interface QRGeneratorProps {
  className?: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ className }) => {
  const { setModal } = useModal();

  return (
    <div className={className}>
      <div className="p-6 flex flex-col justify-evenly items-center text-neutral-200">
        <div className="bg-white p-2 rounded-lg">
          <QRCode value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhGRTU0QkRkRjkwMzk3YjdFMDlBODcyNDlhMmQ2QkYyMzQzMTU1YjEzIiwiaWF0IjoxNjUyOTU4Mzc3LCJleHAiOjE2NTU1NTAzNzd9.JpEDoz6JeJPTxb30bcXx4BWaD6O4D0Gqy4s8LEBTYqk" />
        </div>
        <button
          className="w-full mt-12 py-2 bg-[#83AB2E] rounded-lg"
          onClick={() => {
            setModal(null);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;
