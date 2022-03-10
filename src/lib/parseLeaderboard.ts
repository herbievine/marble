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

  const positions = sortedLeaderboard
    .filter(({ uuid }, index) => uuid === departmentId || index <= 2)
    .map((ldb, index) => ({
      ...ldb,
      position: (ldb.uuid === departmentId ? currentPosition : index) + 1,
    }));

  return positions;
};

export { parseLeaderboard };
