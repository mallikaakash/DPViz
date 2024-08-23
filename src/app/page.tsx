import Image from "next/image";
import Link from "next/link";

const dpProblems = [
  { id: 1, name: "Fibonacci Sequence", path: "/fibonacci" },
  { id: 2, name: "Longest Common Subsequence", path: "/lcs" },
  { id: 3, name: "Knapsack Problem", path: "/knapsack" },
  { id: 6, name: "Edit Distance", path: "/edit-distance" },
  { id: 7, name: "Coin Change", path: "/coin-change" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 overflow-hidden">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mt-8 mb-6">
        Dynamic Programming Visualizations
      </h1>
      <p className="text-base text-center max-w-2xl mb-8 px-4">
        Explore interactive visualizations of classic dynamic programming problems.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto mt-4 max-h-[calc(100vh-12rem)]">
        {dpProblems.map((problem) => (
          <Link key={problem.id} href={problem.path}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-700 hover:border-teal-500">
              <h2 className="text-xl font-semibold text-teal-400 mb-1">{problem.name}</h2>
              <p className="text-sm text-gray-400">Click to explore</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
