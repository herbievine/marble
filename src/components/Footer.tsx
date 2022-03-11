import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-full flex flex-col items-center text-neutral-400 text-sm">
        <a href="#">See a bug or need help?</a>
      </div>
    </div>
  );
};

export default Footer;
