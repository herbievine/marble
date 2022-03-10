import React, { useEffect, useState } from "react";
import { parseLeaderboard } from "../lib/parseLeaderboard";
import { getItem, setItem } from "../lib/storage";
import { NakedUser, User } from "../types/User";

export type UserContext = [
  user?: User,
  findUser?: (uuid?: string) => Promise<boolean>,
  loading?: boolean
];

export const UserContext = React.createContext<UserContext>([]);

const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const findUser = async (id?: string) => {
    setLoading(true);

    const { data: json } = (await (await fetch("/data.json")).json()) as {
      data: NakedUser[];
    };

    const cachedUuid = await getItem("uuid");

    const foundUser = json.find((user) =>
      id ? id === user.id : user.uuid === cachedUuid
    );

    if (foundUser) {
      setItem("uuid", foundUser.uuid);

      const parsedLeaderboard = parseLeaderboard(
        foundUser.departmentId,
        foundUser.leaderboard
      );

      foundUser.leaderboard = parsedLeaderboard;

      setUser(foundUser as User);
    }

    setLoading(false);

    return !!foundUser;
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <UserContext.Provider value={[user, findUser, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
