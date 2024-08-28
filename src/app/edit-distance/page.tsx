'use client'

import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaKeyboard, FaLightbulb, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const EditDistance = () => {
  const [word1, setWord1] = useState<string>('kitten');
  const [word2, setWord2] = useState<string>('sitting');
  const [memo, setMemo] = useState<number[][]>([]);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState<string>('');

  const editDistance = (word1: string, word2: string) => {
    const m = word1.length;
    const n = word2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    const steps: number[][][] = [];
    const explanations: string[] = [];

    // Initialize first row and column
    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }
    steps.push(JSON.parse(JSON.stringify(dp)));
    explanations.push('Initial state: Fill first row and column with incremental values.');

    // Fill the dp table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,  // deletion
            dp[i][j - 1] + 1,  // insertion
            dp[i - 1][j - 1] + 1  // substitution
          );
        }
        steps.push(JSON.parse(JSON.stringify(dp)));
        explanations.push(`Calculating edit distance for '${word1.slice(0, i)}' and '${word2.slice(0, j)}'.`);
      }
    }

    return { steps, explanations };
  };

  useEffect(() => {
    const { steps, explanations } = editDistance(word1, word2);
    setMemo(steps[0]);
    setStep(0);
    setExplanation(explanations[0]);
  }, [word1, word2]);

  const nextStep = () => {
    const { steps, explanations } = editDistance(word1, word2);
    if (step < steps.length - 1) {
      setStep(step + 1);
      setMemo(steps[step + 1]);
      setExplanation(explanations[step + 1]);
    }
  };

  const resetVisualization = () => {
    const { steps, explanations } = editDistance(word1, word2);
    setMemo(steps[0]);
    setStep(0);
    setExplanation(explanations[0]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-8 flex items-center text-indigo-600"
        >
          <FaKeyboard className="mr-4 text-indigo-500" />
          Edit Distance Dilemma
        </motion.h1>
        
        <AnimatePresence>
          {/* Problem Statement Section */}
          <motion.section 
            key="problem-statement"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-indigo-50 p-6 rounded-lg border border-indigo-200"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-indigo-700">
              <FaChalkboardTeacher className="mr-2" />
              Problem Statement
            </h2>
            <p className="mb-4 text-lg leading-relaxed">
              Imagine you're a text editor with magical powers. Your task is to transform one word 
              into another using the minimum number of operations. You can insert, delete, or 
              replace a character. How many operations will it take? Let's find out!
            </p>
          </motion.section>

          {/* Solution Approach Section */}
          <motion.section 
            key="solution-approach"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-700">
              <FaRobot className="mr-2" />
              Solution Approach
            </h2>
            <p className="mb-4 text-lg leading-relaxed">
              We'll use dynamic programming to solve this puzzle! We'll create a table where each 
              cell represents the minimum operations needed to transform a prefix of one word into 
              a prefix of the other. We'll fill this table step by step, considering all possible 
              operations at each stage.
            </p>
          </motion.section>

          {/* Interactive Visualization Section */}
          <motion.section 
            key="interactive-visualization"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-200"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-purple-700">
              <FaLightbulb className="mr-2" />
              Interactive Visualization
            </h2>
            <div className="space-y-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <label className="block mb-2 text-lg font-medium">Word 1:</label>
                <input
                  type="text"
                  value={word1}
                  onChange={(e) => setWord1(e.target.value)}
                  className="w-full p-3 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <label className="block mb-2 text-lg font-medium">Word 2:</label>
                <input
                  type="text"
                  value={word2}
                  onChange={(e) => setWord2(e.target.value)}
                  className="w-full p-3 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </motion.div>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#34D399' }}
                  whileTap={{ scale: 0.975 }}
                  onClick={nextStep}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                >
                  Next Step
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#F87171' }}
                  whileTap={{ scale: 0.975 }}
                  onClick={resetVisualization}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                >
                  Reset
                </motion.button>
              </div>
            </div>
            
            {/* Visualization Table */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="overflow-x-auto mt-6 bg-white p-4 rounded-lg border border-gray-300"
            >
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-300"></th>
                    <th className="px-4 py-2 border-b-2 border-gray-300"></th>
                    {word2.split('').map((char, index) => (
                      <th key={index} className="px-4 py-2 border-b-2 border-gray-300">{char}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {memo.map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 border-b border-gray-300 font-semibold">
                        {i === 0 ? '' : word1[i - 1]}
                      </td>
                      {row.map((value, j) => (
                        <td key={j} className="px-4 py-2 border-b border-gray-300">
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (i * row.length + j) * 0.01 }}
                          >
                            {value}
                          </motion.span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            
            {/* Step Explanation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 bg-white p-4 rounded-lg border border-gray-300"
            >
              <p className="text-lg"><strong>Step:</strong> {step} of {(word1.length + 1) * (word2.length + 1) - 1}</p>
              <p className="text-lg"><strong>Explanation:</strong> {explanation}</p>
            </motion.div>
          </motion.section>

          {/* Final Result Section */}
          <motion.section 
            key="final-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-700">
              <FaKeyboard className="mr-2" />
              Final Result
            </h2>
            <p className="text-xl">
              The minimum number of operations needed to transform "{word1}" into "{word2}" is:{' '}
              <motion.strong 
                className="text-3xl text-green-600 font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                {memo[word1.length] && memo[word1.length][word2.length]}
              </motion.strong>
            </p>
          </motion.section>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EditDistance;