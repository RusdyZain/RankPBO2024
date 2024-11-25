import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchGroup() {
  const [nim, setNim] = useState("");
  interface SearchResult {
    Nama: string;
    Kelompok: string;
    Pendamping: string;
    error?: string;
  }

  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    if (!nim) {
      alert("Masukkan NIM untuk pencarian!");
      return;
    }

    try {
      const res = await fetch(`/api/groups?nim=${nim}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setResult({
          Nama: "",
          Kelompok: "",
          Pendamping: "",
          error: data.error,
        });
      }
    } catch {
      setResult({
        Nama: "",
        Kelompok: "",
        Pendamping: "",
        error: "Terjadi kesalahan dalam pencarian.",
      });
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white w-full max-w-md mx-auto">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-4">
        Cari Nama dan Kelompok
      </h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Masukkan NIM Anda..."
          className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          <FiSearch />
          <span>Cari</span>
        </button>
      </div>
      {result && (
        <div className="mt-6 text-gray-700">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div className="space-y-2">
              <p>
                Nama: <strong>{result.Nama}</strong>
              </p>
              <p>
                Kelompok: <strong>{result.Kelompok}</strong>
              </p>
              <p>
                Pendamping: <strong>{result.Pendamping}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
