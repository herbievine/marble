import React from "react";
import { useUser } from "../hooks/useUser";

interface LeaderboardProps {
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <div className={className}>
      <div className="py-3 border-2 border-neutral-200">
        <div className="px-4 pb-3 border-b-2 border-neutral-200">
          <p>Leaderboard</p>
        </div>
        <table className="w-full shadow-none">
          <tbody>
            {user.leaderboard
              .sort(({ amount: a }, { amount: b }) => b - a)
              .slice(0, 3)
              .map((dep, i) => (
                <tr key={i} className="px-4 flex justify-between">
                  <td className="pt-3">#{i + 1}</td>
                  <td className="pt-3">
                    {dep.title} (£{(dep.amount / 100).toFixed(2)})
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
