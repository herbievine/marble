import React from "react";
import { useAuth } from "../hooks/useAuth";

interface OverviewProps {
  className?: string;
}

const Overview: React.FC<OverviewProps> = ({ className }) => {
  const { auth } = useAuth();

  return (
    <div className={className}>
      <div className="flex justify-between items-center text-lg">
        <p>Hello {auth.username}</p>
        <p>£27.34</p>
      </div>
    </div>
  );
};

export default Overview;
