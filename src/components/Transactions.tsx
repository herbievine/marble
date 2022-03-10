import React from "react";
import { useUser } from "../hooks/useUser";
import dayjs from "dayjs";

interface TransactionsProps {
  className?: string;
}

const Transactions: React.FC<TransactionsProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <div className={className}>
      <div className="py-3 border-2 border-neutral-200 rounded-lg">
        <div className="px-4 pb-3 border-b-2 border-neutral-200">
          <p>Transactions</p>
        </div>
        <table className="w-full shadow-none">
          <tbody>
            {user.transactions
              .sort(
                ({ timestamp: a }, { timestamp: b }) =>
                  new Date(b).getTime() - new Date(a).getTime()
              )
              .slice(0, 5)
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
