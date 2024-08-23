'use client'

import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaCoins, FaLightbulb, FaRobot } from 'react-icons/fa';

const CoinChange = () => {
  const [coins, setCoins] = useState<number[]>([1, 2, 5]);
  const [amount, setAmount] = useState<number>(11);
  const [memo, setMemo] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState<string>('');

  const coinChange = (coins: number[], amount: number) => {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const steps: number[][] = [Array.from(dp)];
    const explanations: string[] = ['Initial state: Set dp[0] = 0, all other values to infinity.'];

    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
      steps.push(Array.from(dp));
      explanations.push(`Calculating minimum coins for amount ${i}.`);
    }

    return { steps, explanations };
  };

  useEffect(() => {
    const { steps, explanations } = coinChange(coins, amount);
    setMemo(steps[0]);
    setStep(0);
    setExplanation(explanations[0]);
  }, [coins, amount]);

  const nextStep = () => {
    const { steps, explanations } = coinChange(coins, amount);
    if (step < steps.length - 1) {
      setStep(step + 1);
      setMemo(steps[step + 1]);
      setExplanation(explanations[step + 1]);
    }
  };

  const resetVisualization = () => {
    const { steps, explanations } = coinChange(coins, amount);
    setMemo(steps[0]);
    setStep(0);
    setExplanation(explanations[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 rounded-lg shadow-lg p-8 backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          <FaCoins className="mr-4 text-yellow-400" />
          Coin Change Conundrum
        </h1>
        
        <section className="mb-8 bg-indigo-900 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaChalkboardTeacher className="mr-2 text-green-400" />
            Problem Statement
          </h2>
          <p className="mb-4 text-lg">
            Imagine you're a robot with a coin dispenser, tasked with giving out change. 
            Your mission: Find the minimum number of coins needed to make up a specific amount, 
            given a set of coin denominations. If it's impossible, you must alert the humans!
          </p>
        </section>

        <section className="mb-8 bg-blue-900 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaRobot className="mr-2 text-blue-400" />
            Solution Approach
          </h2>
          <p className="mb-4 text-lg">
            We'll use the power of dynamic programming! We'll create a magic array where each 
            position represents the minimum coins needed for that amount. We start small and 
            build our way up, considering each coin type at every step. It's like solving a 
            puzzle, piece by piece!
          </p>
        </section>

        <section className="mb-8 bg-purple-900 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-400" />
            Interactive Visualization
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Available Coins:</label>
            <input
              type="text"
              value={coins.join(', ')}
              onChange={(e) => setCoins(e.target.value.split(',').map(Number))}
              className="w-full p-2 border rounded bg-white bg-opacity-20 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Target Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded bg-white bg-opacity-20 text-white"
            />
          </div>
          <div className="mb-4">
            <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 transition duration-300">
              Next Step
            </button>
            <button onClick={resetVisualization} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300">
              Reset
            </button>
          </div>
          <div className="overflow-x-auto mb-4 bg-black bg-opacity-30 p-4 rounded-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 border-b border-gray-600">Amount</th>
                  {memo.map((_, i) => (
                    <th key={i} className="p-2 border-b border-gray-600">{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-bold border-r border-gray-600">Min Coins</td>
                  {memo.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-2 text-center ${
                        cell === Infinity ? 'bg-red-500 bg-opacity-50' : 
                        cell === 0 ? 'bg-gray-500 bg-opacity-50' : 'bg-green-500 bg-opacity-50'
                      }`}
                    >
                      {cell === Infinity ? '∞' : cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-4 bg-black bg-opacity-30 p-4 rounded-lg">
            <p className="text-lg"><strong>Step:</strong> {step} of {amount + 1}</p>
            <p className="text-lg"><strong>Explanation:</strong> {explanation}</p>
          </div>
        </section>

        <section className="bg-green-900 bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCoins className="mr-2 text-yellow-400" />
            Final Result
          </h2>
          <p className="text-xl">
            The minimum number of coins needed to make up the amount {amount} is:{' '}
            <strong className="text-2xl text-yellow-300">
              {memo[amount] === Infinity ? 'Not possible' : memo[amount]}
            </strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CoinChange;