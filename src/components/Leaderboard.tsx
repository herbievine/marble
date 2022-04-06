import dayjs from "dayjs";
import React from "react";
import { useUser } from "../hooks/useAuth";

interface LeaderboardProps {
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <div className={className}>
      <div className="py-3 border-2 border-neutral-200 rounded-lg">
        <div className="px-4 pb-3 border-b-2 border-neutral-200">
          <p>Leaderboard ({dayjs().format("MMMM")})</p>
        </div>
        <table className="w-full shadow-none">
          <tbody>
            {user.leaderboard
              .sort(({ amount: a }, { amount: b }) => b - a)
              .map((dep) => (
                <tr
                  key={dep.position}
                  className={`px-4 flex justify-between ${
                    dep.uuid === user.departmentId && "text-[#83AB2E]"
                  }`}
                >
                  <td className="pt-3">#{dep.position}</td>
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
