import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

interface TransactionsProps {
  className?: string;
}

const Transactions: React.FC<TransactionsProps> = ({ className }) => {
  const [limit, setLimit] = useState(3);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await (await fetch("/data.json")).json();

    console.log(res?.data[0]?.transactions);

    setData(res?.data[0]?.transactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={className}>
      <div className="py-3 border-2 border-neutral-200 rounded-lg">
        <div className="px-4 pb-3 border-b-2 border-neutral-200">
          <p>Transactions</p>
        </div>
        <table className="w-full shadow-none">
          <tbody>
            {data &&
              data
                .sort(
                  ({ timestamp: a }, { timestamp: b }) =>
                    dayjs(b).unix() - dayjs(a).unix()
                )
                .slice(0, limit)
                .map((tx, i) => (
                  <tr key={i} className="px-4 flex justify-between">
                    <td className="pt-3">
                      {dayjs(tx.timestamp).format("DD/MM/YY")}
                    </td>
                    <td className="pt-3">
                      {tx.type === "COLLECT"
                        ? `+£${(tx.amount / 100).toFixed(2)}`
                        : `-£${(tx.amount / 100).toFixed(2)}`}
                    </td>
                  </tr>
                ))}
            {data && limit <= data.length - 1 && (
              <tr className="px-4 flex justify-between">
                <td
                  className="pt-3 cursor-pointer"
                  onClick={() => setLimit((prev) => prev + 3)}
                >
                  View more...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
