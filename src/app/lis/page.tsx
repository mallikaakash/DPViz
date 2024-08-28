'use client'

import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaChartLine, FaLightbulb, FaRobot, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const LIS = () => {
  const [sequence, setSequence] = useState<number[]>([10, 22, 9, 33, 21, 50, 41, 60, 80]);
  const [memo, setMemo] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState<string>('');

  const lis = (arr: number[]) => {
    const n = arr.length;
    const dp = new Array(n).fill(1);
    const steps: number[][] = [Array.from(dp)];
    const explanations: string[] = ['Initial state: Set all LIS lengths to 1.'];

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
          steps.push(Array.from(dp));
          explanations.push(`Update LIS length for ${arr[i]} to ${dp[i]} (considering ${arr[j]}).`);
        }
      }
      if (steps[steps.length - 1].toString() !== dp.toString()) {
        steps.push(Array.from(dp));
        explanations.push(`No update for ${arr[i]}.`);
      }
    }

    return { steps, explanations };
  };

  useEffect(() => {
    const { steps, explanations } = lis(sequence);
    setMemo(steps[0]);
    setStep(0);
    setExplanation(explanations[0]);
  }, [sequence]);

  const nextStep = () => {
    const { steps, explanations } = lis(sequence);
    if (step < steps.length - 1) {
      setStep(step + 1);
      setMemo(steps[step + 1]);
      setExplanation(explanations[step + 1]);
    }
  };

  const resetVisualization = () => {
    const { steps, explanations } = lis(sequence);
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
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 p-1"
          >
            <FaChartLine className="mr-4 text-yellow-500" />
            Longest Increasing Subsequence
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
              Given an unsorted array of integers, find the length of the longest increasing subsequence (LIS). 
              An increasing subsequence is a sequence of elements where each element is strictly greater than 
              the previous one, but they don't need to be adjacent in the original array.
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
              We'll use dynamic programming to solve this efficiently. We'll create an array where each element 
              represents the length of the LIS ending at that index. We'll build this array by comparing each 
              element with all previous elements, updating the LIS length when we find a smaller element that 
              can be part of the increasing subsequence.
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
            <div className="space-y-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <label className="block mb-2 text-lg font-medium text-gray-700">Input Sequence:</label>
                <input
                  type="text"
                  value={sequence.join(', ')}
                  onChange={(e) => setSequence(e.target.value.split(',').map(Number))}
                  className="w-full p-3 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </motion.div>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#34D399' }}
                  whileTap={{ scale: 0.975 }}
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                >
                  Next Step
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#F87171' }}
                  whileTap={{ scale: 0.975 }}
                  onClick={resetVisualization}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-md font-medium transition duration-300"
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
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-indigo-600">Index</th>
                  {sequence.map((_, index) => (
                    <th key={index} className="px-4 py-2 border-b-2 border-gray-300 text-indigo-600">{index}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 font-semibold text-purple-600">Value</td>
                  {sequence.map((value, index) => (
                    <td key={index} className="px-4 py-2 border-b border-gray-300 text-gray-700">{value}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-gray-300 font-semibold text-purple-600">LIS Length</td>
                  {memo.map((value, index) => (
                    <td key={index} className="px-4 py-2 border-b border-gray-300 text-gray-700">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {value}
                      </motion.span>
                    </td>
                  ))}
                </tr>
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
            <p className="text-lg"><strong className="text-indigo-600">Step:</strong> <span className="text-gray-700">{step} of {sequence.length}</span></p>
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
            <FaChartLine className="mr-2 text-green-600" />
            Final Result
          </h2>
          <p className="text-xl text-gray-700">
            The length of the Longest Increasing Subsequence is:{' '}
            <motion.strong 
              className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              {Math.max(...memo)}
            </motion.strong>
          </p>
        </motion.section>
      </AnimatePresence>
    </div>
  </motion.div>
  );
};

export default LIS;