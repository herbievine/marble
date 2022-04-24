import React from "react";
import { magic } from "../lib/magic";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-full flex flex-col items-center text-neutral-400 text-sm">
        <a href="#">See a bug or need help?</a>
        <p
          onClick={async () => {
            const metadata = await magic().user.getMetadata();
            const didToken = await magic().user.getIdToken();

            console.log(JSON.stringify({ ...metadata, didToken }));
          }}
        >
          user metadata
        </p>
      </div>
    </div>
  );
};

export default Footer;
