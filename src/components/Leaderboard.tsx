import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { parseLeaderboard } from "../lib/parseLeaderboard";

interface LeaderboardProps {
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ className }) => {
  const [data, setData] = useState(null);
  const depId = "fd1da9e0-3dd3-4a51-80ae-5c6b60acfdba";

  const fetchData = async () => {
    const res = await (await fetch("/data.json")).json();

    console.log(res?.data[0]?.leaderboard);

    const parsedLeaderboard = parseLeaderboard(
      depId,
      res?.data[0]?.leaderboard
    );

    console.log(parsedLeaderboard);

    setData(parsedLeaderboard);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={className}>
      <div className="py-3 border-2 border-neutral-200 rounded-lg">
        <div className="px-4 pb-3 border-b-2 border-neutral-200">
          <p>Leaderboard ({dayjs().format("MMMM")})</p>
        </div>
        <table className="w-full shadow-none">
          <tbody>
            {data &&
              data
                .sort(({ amount: a }, { amount: b }) => b - a)
                .map((dep) => (
                  <tr
                    key={dep.position}
                    className={`px-4 flex justify-between ${
                      dep.uuid === depId && "text-[#83AB2E]"
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
