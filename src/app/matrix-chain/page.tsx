'use client'

import React, { useState, useEffect } from 'react';

const MatrixChainMultiplication = () => {
  const [dimensions, setDimensions] = useState<number[]>([30, 35, 15, 5, 10, 20, 25]);
  const [memo, setMemo] = useState<number[][]>([]);
  const [step, setStep] = useState(0);

  const initializeMemo = (n: number) => {
    return Array(n).fill(null).map(() => Array(n).fill(Infinity));
  };

  const matrixChainOrder = (dims: number[]) => {
    const n = dims.length - 1;
    const m = initializeMemo(n);
    const steps: number[][][] = [];

    for (let i = 0; i < n; i++) {
      m[i][i] = 0;
    }
    steps.push(JSON.parse(JSON.stringify(m)));

    for (let len = 2; len <= n; len++) {
      for (let i = 0; i < n - len + 1; i++) {
        const j = i + len - 1;
        for (let k = i; k < j; k++) {
          const cost = m[i][k] + m[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
          if (cost < m[i][j]) {
            m[i][j] = cost;
          }
        }
        steps.push(JSON.parse(JSON.stringify(m)));
      }
    }

    return steps;
  };

  useEffect(() => {
    const steps = matrixChainOrder(dimensions);
    setMemo(steps[0]);
    setStep(0);
  }, [dimensions]);

  const nextStep = () => {
    const steps = matrixChainOrder(dimensions);
    if (step < steps.length - 1) {
      setStep(step + 1);
      setMemo(steps[step + 1]);
    }
  };

  const resetVisualization = () => {
    const steps = matrixChainOrder(dimensions);
    setMemo(steps[0]);
    setStep(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Matrix Chain Multiplication</h1>
      <div className="mb-4">
        <label className="block mb-2">Matrix Dimensions:</label>
        <input
          type="text"
          value={dimensions.join(', ')}
          onChange={(e) => setDimensions(e.target.value.split(',').map(Number))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Next Step
        </button>
        <button onClick={resetVisualization} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {memo.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border p-2 ${i === j ? 'bg-gray-200' : cell === Infinity ? 'bg-red-100' : 'bg-green-100'}`}
                  >
                    {cell === Infinity ? '∞' : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p>Step: {step}</p>
        <p>Total Steps: {matrixChainOrder(dimensions).length}</p>
      </div>
    </div>
  );
};

export default MatrixChainMultiplication;