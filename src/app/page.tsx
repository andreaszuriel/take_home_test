"use client";

import React, { useState, useEffect } from "react";
import DominoCardList from "../components/DominoCardList";

const initialCards: [number, number][] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

//save to localStorage 
const IndexPage: React.FC = () => {
  const [cards, setCards] = useState<[number, number][]>(initialCards);
  const [doubleCount, setDoubleCount] = useState(0);
  const [input, setInput] = useState("");

  const STORAGE_KEY = 'dominoes-cards';

  useEffect(() => {
    // Read from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: [number, number][] = JSON.parse(saved);
        setCards(parsed);
      } catch {}
    }
  }, []);
  
  // whenever cards change, write to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  // Recompute doubleCount whenever cards change
  useEffect(() => {
    setDoubleCount(cards.filter(([a, b]) => a === b).length);
  }, [cards]);

  // Sort ascending
  const sortAsc = () =>
    setCards([...cards].sort((a, b) => a[0] + a[1] - (b[0] + b[1])));

  // Sort descending
  const sortDesc = () =>
    setCards([...cards].sort((a, b) => b[0] + b[1] - (a[0] + a[1])));

  // Flip
  const flip = () =>
    setCards(cards.map(([a, b]) => [b, a] as [number, number]));

  // Remove duplicates
  const removeDup = () => {
    const counts = cards.reduce<Record<string, number>>((acc, [a, b]) => {
      const key = a <= b ? `${a},${b}` : `${b},${a}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    setCards(
      cards.filter(([a, b]) => {
        const key = a <= b ? `${a},${b}` : `${b},${a}`;
        return counts[key] === 1;
      })
    );
  };

  // Reset
  const reset = () => {
    setCards(initialCards);
    setInput("");
  };

  // Remove containing numbers
  const removeByNumber = () => {
    const nums = input
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n));
    setCards(cards.filter(([a, b]) => !nums.includes(a) && !nums.includes(b)));
  };

  return (
    <div className="container mx-auto p-6">

      {/*Header*/}
      <h1 className="text-4xl font-bold mb-6">Dominoes</h1>


      {/*Source & Double Numbers*/}
      <div className="mb-6 flex flex-col space-y-4">
        <div className="p-4 border rounded bg-gray-50 w-150">
          <div className="font-semibold mb-2">Source</div>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(initialCards)}
          </pre>
        </div>
        <div className="p-4 border rounded bg-gray-50 w-150">
          <div className="font-semibold mb-2">Double Numbers</div>
          <div>{doubleCount}</div>
        </div>
      </div>

      {/*Domino card*/}
      <DominoCardList cards={cards} />

      {/*Button*/}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={sortAsc}
          className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Sort (ASC)
        </button>
        <button
          onClick={sortDesc}
          className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Sort (DSC)
        </button>
        <button
          onClick={flip}
          className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Flip
        </button>
        <button
          onClick={removeDup}
          className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Remove Dup
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center gap-1 mb-0">
        <input
          type="text"
          placeholder="Input Number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded"
        />
      </div>
      <button
        onClick={removeByNumber}
        className="px-6 py-2 bg-sky-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  );
};

export default IndexPage;
