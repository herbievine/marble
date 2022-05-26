import React from "react";
import { useUser } from "../hooks/useUser";

interface OverviewProps {
  className?: string;
}

const Overview: React.FC<OverviewProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <div className={className}>
      <div className="flex justify-between items-center text-lg">
        <p>Hello {user.username}</p>
        <p>£{(user.amount / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Overview;
