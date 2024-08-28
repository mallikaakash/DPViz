'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const dpProblems = [
  { id: 1, name: "Fibonacci Sequence", path: "/fibonacci" },
  { id: 2, name: "Longest Common Subsequence", path: "/lcs" },
  { id: 3, name: "Knapsack Problem", path: "/knapsack" },
  { id: 6, name: "String Transformation", path: "/string-transformation" },
  { id: 7, name: "Coin Change", path: "/coin-change" },
];

export default function Home() {
  return (
    // <div className="flex flex-col items-center w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200 overflow-hidden">
    //   <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mt-8 mb-6">
    //     Dynamic Programming Visualizations
    //   </h1>
    //   <p className="text-base text-center max-w-2xl mb-8 px-4">
    //     Explore interactive visualizations of classic dynamic programming problems.
    //   </p>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto mt-4 max-h-[calc(100vh-12rem)]">
    //     {dpProblems.map((problem) => (
    //       <Link key={problem.id} href={problem.path}>
    //         <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-700 hover:border-teal-500">
    //           <h2 className="text-xl font-semibold text-teal-400 mb-1">{problem.name}</h2>
    //           <p className="text-sm text-gray-400">Click to explore</p>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>

    //-----------------------------------------------------------
<div className="relative flex flex-col items-center w-full min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Animated background orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-20"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="relative text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mt-8 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dynamic Programming Visualizations
      </motion.h1>
      <motion.p
        className="relative text-base text-center max-w-2xl mb-8 px-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore interactive visualizations of classic dynamic programming problems.
      </motion.p>
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-hidden p-4 mt-4 max-h-[calc(100vh-12rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {dpProblems.map((problem) => (
          <Link key={problem.id} href={problem.path}>
            <motion.div
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-teal-500 cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-semibold text-teal-600 mb-1">{problem.name}</h2>
              <p className="text-sm text-gray-500">Click to explore</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
    //-----------------------------------------------------------

    // <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden">
    //   {/* Aurora background */}
    //   <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-teal-900">
    //     <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    //       <path fill="rgba(255,255,255,0.1)" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    //     </svg>
    //   </div>

    //   {/* Content */}
    //   <div className="relative z-10 text-white">
    //     <h1 className="text-4xl font-bold mt-8 mb-6">
    //       Dynamic Programming Visualizations
    //     </h1>
    //     <p className="text-base text-center max-w-2xl mb-8 px-4">
    //       Explore interactive visualizations of classic dynamic programming problems.
    //     </p>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    //       {dpProblems.map((problem) => (
    //         <Link key={problem.id} href={problem.path}>
    //           <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300">
    //             <h2 className="text-xl font-semibold mb-1">{problem.name}</h2>
    //             <p className="text-sm opacity-70">Click to explore</p>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}
