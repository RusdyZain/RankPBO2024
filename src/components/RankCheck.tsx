import { useState } from "react";
import { FaTrophy } from "react-icons/fa";

export default function RankCheck() {
  const [nim, setNim] = useState("");
  interface RankData {
    Rank?: number;
    error?: string;
  }

  const [rank, setRank] = useState<RankData | null>(null);

  const handleCheckRank = async () => {
    if (!nim) {
      alert("Masukkan NIM untuk pengecekan!");
      return;
    }

    try {
      const res = await fetch(`/api/rank?nim=${nim}`); // Ensure API endpoint matches
      const data = await res.json();
      if (res.ok) setRank(data);
      else setRank({ error: data.error });
    } catch {
      setRank({ error: "Terjadi kesalahan dalam pengecekan." });
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cek Rank</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Masukkan NIM Anda untuk cek rank..."
          className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-400"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
          onClick={handleCheckRank}
        >
          <FaTrophy />
          <span>Cek</span>
        </button>
      </div>
      {rank && (
        <div className="mt-6 text-gray-700">
          {rank.error ? (
            <p className="text-red-500">{rank.error}</p>
          ) : (
            <p>
              Rank: <strong>{rank.Rank}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
