import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import bg_Poke from "../assets/images/bg_pokeball.png";

const LeaderBoard = () => {
  const { username } = useOutletContext();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(username);

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

    if (battles >= 10) {
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
    } else {
      // Fewer than 10 battles
      return "Unranked";
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <img
        src={bg_Poke}
        alt="pokeball_grey"
        className="fixed inset -bottom-36 -right-36 overflow-hidden z-0"
      />
      <div className="p-10 float-start w-full z-20 relative">
        <table className="bg-[#FFECEC]/60 rounded-lg overflow-hidden w-full text-center border-separate border-spacing-0">
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
              <tr
                key={user._id}
                className={` ${
                  username === user.username ? "bg-red-400 " : null
                } border-white`}
              >
                <td
                  className={`p-4 text-black border-b-4 ${
                    username === user.username
                      ? "font-extrabold border-white"
                      : "border-white"
                  }`}
                >
                  {user.username}
                </td>
                <td
                  className={`p-4 text-black border-b-4 ${
                    username === user.username
                      ? "font-extrabold"
                      : "font-normal text-black"
                  } border-white`}
                >
                  {user.battles}
                </td>
                <td
                  className={`p-4 text-black border-b-4 ${
                    username === user.username ? "font-bold" : "font-normal"
                  } border-white`}
                >
                  {user.won}
                </td>
                <td
                  className={`p-4 text-black border-b-4 ${
                    username === user.username ? "font-bold" : "font-normal"
                  } border-white`}
                >
                  {user.lost}
                </td>
                <td
                  className={`p-4 text-black border-b-4 ${
                    username === user.username ? "font-bold" : "font-normal"
                  } border-white`}
                >
                  {user.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-8">
          <Link to="/home">
            <button className="text-center text-xl bg-red-600 hover:bg-black hover:shadow-lg text-white p-3 rounded-3xl">
              Play again!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
