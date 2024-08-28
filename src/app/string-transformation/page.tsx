'use client'

import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaCoins, FaKeyboard, FaLightbulb, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

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
      <div className="flex justify-between items-center mb-8 ">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 "
        >
          <FaCoins className="mr-4 text-yellow-500" />
          String Transformation 
        </motion.h1>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center "
          >
            <FaArrowLeft className="mr-2" />
            Return Home
          </motion.button>
        </Link>
      </div>
        
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
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              <FaChalkboardTeacher className="mr-2 text-indigo-600" />
              Problem Statement
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              Imagine you&apos;re a text editor with magical powers. Your task is to transform one word 
              into another using the minimum number of operations. You can insert, delete, or 
              replace a character. How many operations will it take? Let&apos;s find out!
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
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              <FaRobot className="mr-2 text-blue-600" />
              Solution Approach
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              We&apos;ll use dynamic programming to solve this puzzle! We&apos;ll create a table where each 
              cell represents the minimum operations needed to transform a prefix of one word into 
              a prefix of the other. We&apos;ll fill this table step by step, considering all possible 
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
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              <FaLightbulb className="mr-2 text-purple-600" />
              Interactive Visualization
            </h2>
            {/* ... existing input fields and buttons ... */}
            
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
                    <th className="px-4 py-2 border-b-2 border-gray-300 text-indigo-600"></th>
                    <th className="px-4 py-2 border-b-2 border-gray-300 text-indigo-600"></th>
                    {word2.split('').map((char, index) => (
                      <th key={index} className="px-4 py-2 border-b-2 border-gray-300 text-indigo-600">{char}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {memo.map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 border-b border-gray-300 font-semibold text-purple-600">
                        {i === 0 ? '' : word1[i - 1]}
                      </td>
                      {row.map((value, j) => (
                        <td key={j} className="px-4 py-2 border-b border-gray-300 text-gray-700">
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
              <p className="text-lg"><strong className="text-indigo-600">Step:</strong> <span className="text-gray-700">{step} of {(word1.length + 1) * (word2.length + 1) - 1}</span></p>
              <p className="text-lg"><strong className="text-indigo-600">Explanation:</strong> <span className="text-gray-700">{explanation}</span></p>
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
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              <FaKeyboard className="mr-2 text-green-600" />
              Final Result
            </h2>
            <p className="text-xl text-gray-700">
              The minimum number of operations needed to transform &quot;{word1}&quot; into &quot;{word2}&quot; is:{' '}
              <motion.strong 
                className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 font-bold"
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