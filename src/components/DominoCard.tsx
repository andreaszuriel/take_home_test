import React from 'react';

interface DominoCardProps {
  card: [number, number];
}

const DominoCard: React.FC<DominoCardProps> = ({ card }) => {
  return (
    <div className="border w-5 text-center font-mono text-s bg-white shadow">
      <div className="p-1">{card[0]}</div>
      <div className="p-1"> - </div>
      <div className="p-1">{card[1]}</div>
    </div>
  );
};

export default DominoCard;
