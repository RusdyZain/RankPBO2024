import { useState } from "react";
import { FaTrophy } from "react-icons/fa";

export default function RankCheck() {
  const [nim, setNim] = useState("");
  interface RankData {
    Rank: number;
    NIM: string;
    error?: string;
  }

  const [rank, setRank] = useState<RankData | null>(null);

  const handleCheckRank = async () => {
    if (!nim) {
      alert("Masukkan NIM untuk pengecekan!");
      return;
    }

    try {
      const res = await fetch(`/api/ranks?nim=${nim}`);
      const data = await res.json();
      if (res.ok) setRank(data);
      else
        setRank({
          Rank: 0,
          NIM: "",
          error: data.error,
        });
    } catch {
      setRank({
        Rank: 0,
        NIM: "",
        error: "Terjadi kesalahan dalam pencarian.",
      });
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white w-full max-w-md mx-auto">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-4">
        Cek Rank
      </h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Masukkan NIM Anda untuk cek rank..."
          className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-green-400"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition"
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
