import React from "react";

interface QRProps {
  className?: string;
}

const QR: React.FC<React.SVGProps<SVGSVGElement> & QRProps> = ({
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={35}
      height={35}
      fill="#83AB2E"
      {...props}
    >
      <path d="M144 32c26.5 0 48 21.49 48 48v96c0 26.5-21.5 48-48 48H48c-26.51 0-48-21.5-48-48V80c0-26.51 21.49-48 48-48h96zm-16 64H64v64h64V96zm16 192c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.51 0-48-21.5-48-48v-96c0-26.5 21.49-48 48-48h96zm-16 64H64v64h64v-64zM256 80c0-26.51 21.5-48 48-48h96c26.5 0 48 21.49 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48V80zm64 80h64V96h-64v64zm32 288h32v32h-32v-32zm96 32h-32v-32h32v32zm-32-192h32v128h-96v-32h-32v96h-64V288h96v32h64v-32z" />
    </svg>
  );
};

export default QR;