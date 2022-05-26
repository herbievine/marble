import { Leaderboard, LeaderboardWithPosition } from "../types/Leaderboard";

const parseLeaderboard = (
  departmentId: string,
  leaderboard: Leaderboard[]
): LeaderboardWithPosition[] => {
  const sortedLeaderboard = leaderboard.sort(
    ({ amount: a }, { amount: b }) => b - a
  );

  const currentPosition = sortedLeaderboard.findIndex(
    ({ uuid }) => uuid === departmentId
  );

  return sortedLeaderboard.map((ldb, index) => ({
    ...ldb,
    position: (ldb.uuid === departmentId ? currentPosition : index) + 1,
  }));
};

export { parseLeaderboard };
