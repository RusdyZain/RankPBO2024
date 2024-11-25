import SearchGroup from "../components/SearchGroup";
import RankCheck from "../components/RankCheck";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex flex-col items-center justify-center space-y-12 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md text-center">
        Aplikasi Pencarian Kelompok dan Ranking
      </h1>
      <div className="space-y-8 w-full max-w-2xl">
        <SearchGroup />
        <RankCheck />
      </div>
    </div>
  );
}
