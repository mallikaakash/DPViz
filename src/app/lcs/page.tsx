// 'use client'

// import React, { useState, useEffect } from 'react';

// const LCS = () => {
//   const [str1, setStr1] = useState<string>('Enter String 1');
//   const [str2, setStr2] = useState<string>('ENter String 2');
//   const [memo, setMemo] = useState<number[][]>([]);
//   const [step, setStep] = useState<number>(0);
//   const [explanation, setExplanation] = useState<string>('');

//   const lcs = (s1: string, s2: string) => {
//     const m = s1.length;
//     const n = s2.length;
//     const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
//     const steps: number[][][] = [];
//     const explanations: string[] = [];

//     steps.push(JSON.parse(JSON.stringify(dp)));
//     explanations.push('Initialize the DP table with zeros.');

//     for (let i = 1; i <= m; i++) {
//       for (let j = 1; j <= n; j++) {
//         if (s1[i - 1] === s2[j - 1]) {
//           dp[i][j] = dp[i - 1][j - 1] + 1;
//           steps.push(JSON.parse(JSON.stringify(dp)));
//           explanations.push(`Match found: ${s1[i - 1]}. Increment LCS length.`);
//         } else {
//           dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//           steps.push(JSON.parse(JSON.stringify(dp)));
//           explanations.push(`No match. Take max of left or top cell.`);
//         }
//       }
//     }

//     return { steps, explanations };
//   };

//   useEffect(() => {
//     const { steps, explanations } = lcs(str1, str2);
//     setMemo(steps[0]);
//     setStep(0);
//     setExplanation(explanations[0]);
//   }, [str1, str2]);

//   const nextStep = () => {
//     const { steps, explanations } = lcs(str1, str2);
//     if (step < steps.length - 1) {
//       setStep(step + 1);
//       setMemo(steps[step + 1]);
//       setExplanation(explanations[step + 1]);
//     }
//   };

//   const resetVisualization = () => {
//     const { steps, explanations } = lcs(str1, str2);
//     setMemo(steps[0]);
//     setStep(0);
//     setExplanation(explanations[0]);
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Longest Common Subsequence (LCS)</h1>
      
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
//         <p className="mb-4">
//           Given two strings, find the length of their longest common subsequence (LCS).
//           A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.
//         </p>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Input Strings</h2>
//         <div className="mb-4">
//           <label className="block mb-2">String 1:</label>
//           <input
//             type="text"
//             value={str1}
//             onChange={(e) => setStr1(e.target.value.toUpperCase())}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">String 2:</label>
//           <input
//             type="text"
//             value={str2}
//             onChange={(e) => setStr2(e.target.value.toUpperCase())}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Visualization</h2>
//         <div className="mb-4">
//           <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
//             Next Step
//           </button>
//           <button onClick={resetVisualization} className="bg-gray-500 text-white px-4 py-2 rounded">
//             Reset
//           </button>
//         </div>
//         <div className="overflow-x-auto mb-4">
//           <table className="border-collapse">
//             <thead>
//               <tr>
//                 <th className="border p-2"></th>
//                 <th className="border p-2"></th>
//                 {str2.split('').map((char, i) => (
//                   <th key={i} className="border p-2">{char}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {memo.map((row, i) => (
//                 <tr key={i}>
//                   <th className="border p-2">{i === 0 ? '' : str1[i - 1]}</th>
//                   {row.map((cell, j) => (
//                     <td key={j} className="border p-2 bg-green-100">{cell}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mb-4">
//           <p><strong>Step:</strong> {step} of {str1.length * str2.length}</p>
//           <p><strong>Explanation:</strong> {explanation}</p>
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Result</h2>
//         <p>
//           The length of the longest common subsequence is:{' '}
//           <strong>{memo[str1.length] && memo[str1.length][str2.length]}</strong>
//         </p>
//       </section>
//     </div>
//   );
// };

// export default LCS;

'use client'

import React, { useState, useEffect } from 'react';

interface TreeNode {
  key: string;
  value: number;
  x: number;
  y: number;
  children: TreeNode[];
}

const LCSTree = () => {
  const [str1, setStr1] = useState<string>('ABCD');
  const [str2, setStr2] = useState<string>('ACDF');
  const [tree, setTree] = useState<TreeNode | null>(null);

  const lcs = (s1: string, s2: string, i: number, j: number): TreeNode => {
    const key = `LCS(${s1.slice(i)}, ${s2.slice(j)})`;
    
    if (i === s1.length || j === s2.length) {
      return { key, value: 0, x: 0, y: 0, children: [] };
    }

    if (s1[i] === s2[j]) {
      const subtree = lcs(s1, s2, i + 1, j + 1);
      return { key, value: subtree.value + 1, x: 0, y: 0, children: [subtree] };
    } else {
      const subtree1 = lcs(s1, s2, i + 1, j);
      const subtree2 = lcs(s1, s2, i, j + 1);
      if (subtree1.value > subtree2.value) {
        return { key, value: subtree1.value, x: 0, y: 0, children: [subtree1, subtree2] };
      } else {
        return { key, value: subtree2.value, x: 0, y: 0, children: [subtree2, subtree1] };
      }
    }
  };

  const layoutTree = (node: TreeNode, depth: number = 0, pos: number = 0): number => {
    node.y = depth * 80;
    
    if (node.children.length === 0) {
      node.x = pos;
      return pos + 1;
    }

    let childPos = pos;
    for (const child of node.children) {
      childPos = layoutTree(child, depth + 1, childPos);
    }

    node.x = node.children.reduce((sum, child) => sum + child.x, 0) / node.children.length;
    return childPos;
  };

  useEffect(() => {
    const root = lcs(str1, str2, 0, 0);
    layoutTree(root);
    setTree(root);
  }, [str1, str2]);

  const renderTree = (node: TreeNode) => {
    return (
      <g key={node.key}>
        <circle cx={node.x * 120} cy={node.y} r="30" fill="lightblue" stroke="blue" />
        <text x={node.x * 120} y={node.y} textAnchor="middle" dy=".3em" fontSize="12">
          {`${node.key.split('(')[1].split(')')[0]}`}
        </text>
        <text x={node.x * 120} y={node.y + 15} textAnchor="middle" dy=".3em" fontSize="12" fill="red">
          {node.value}
        </text>
        {node.children.map((child, index) => (
          <line
            key={index}
            x1={node.x * 120}
            y1={node.y + 30}
            x2={child.x * 120}
            y2={child.y - 30}
            stroke="black"
          />
        ))}
        {node.children.map(renderTree)}
      </g>
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">LCS Recursive Tree Visualization</h1>
      
      <div className="mb-4">
        <label className="block mb-2">String 1:</label>
        <input
          type="text"
          value={str1}
          onChange={(e) => setStr1(e.target.value.toUpperCase())}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">String 2:</label>
        <input
          type="text"
          value={str2}
          onChange={(e) => setStr2(e.target.value.toUpperCase())}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="overflow-auto border">
        <svg width="1200" height="600">
          {tree && renderTree(tree)}
        </svg>
      </div>
    </div>
  );
};

export default LCSTree;