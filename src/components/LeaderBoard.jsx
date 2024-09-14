import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8081/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        const updatedData = data.map((user) => ({
          ...user,
          rank: determineRank(user.battles, user.won, user.lost),
        }));
        setLeaderboardData(updatedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const determineRank = (battles, won, lost) => {
    const winRate = (won / battles) * 100;

    if (winRate > 80) {
      return "Champion";
    } else if (winRate > 60) {
      return "Grandmaster";
    } else if (winRate > 50) {
      return "Master";
    } else if (winRate > 40) {
      return "Diamond";
    } else if (winRate > 30) {
      return "Platinum";
    } else if (winRate > 20) {
      return "Gold";
    } else if (winRate > 10) {
      return "Silver";
    } else {
      return "Bronze";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-10 float-start w-full">
      <table className="bg-[#FFECEC] rounded-lg overflow-hidden w-full text-center border-separate border-spacing-0">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-4">Username</th>
            <th className="p-4">Battles</th>
            <th className="p-4">Won</th>
            <th className="p-4">Lost</th>
            <th className="p-4">Rank</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user._id}>
              <td className="p-4 text-black border-b-4 border-white">
                {user.username}
              </td>
              <td className="p-4 text-black border-b-4 border-white">
                {user.battles}
              </td>
              <td className="p-4 text-black border-b-4 border-white">
                {user.won}
              </td>
              <td className="p-4 text-black border-b-4 border-white">
                {user.lost}
              </td>
              <td className="p-4 text-black font-semibold border-b-4 border-white">
                {user.rank}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <button className="text-center text-xl bg-red-600 hover:bg-black hover:shadow-lg text-white p-3 rounded-3xl">
          Play again!
        </button>
      </div>
    </div>
  );
};

export default LeaderBoard;
