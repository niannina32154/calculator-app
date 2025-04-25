'use client';
import React, { useState } from 'react';

export default function CalculatorPage() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = async () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('请输入有效数字');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/calculator.v1.CalculatorService/Calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b, operator }),
      });

      if (!response.ok) {
        throw new Error('网络错误');
      }

      const data = await response.json();
      setResult(data.result.toString());
    } catch (error) {
      console.error('请求失败', error);
      setResult('请求失败或格式错误');
    }
  };

  return (
    <main className="flex flex-col items-center p-10 max-w-md mx-auto gap-4">
      <h1 className="text-2xl font-bold mb-4">🧮 简易计算器</h1>

      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="输入第一个数字"
      />

      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="+">加 +</option>
        <option value="-">减 -</option>
        <option value="*">乘 *</option>
        <option value="/">除 /</option>
      </select>

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="输入第二个数字"
      />

      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        计算
      </button>

      {result !== null && (
        <div data-testid="result" className="mt-4 text-lg font-semibold">
          结果：{result}
        </div>
      )}
    </main>
  );
}
