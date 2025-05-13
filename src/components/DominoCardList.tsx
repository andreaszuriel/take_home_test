import React from 'react';
import DominoCard from './DominoCard';

interface DominoCardListProps {
  cards: [number, number][];
}

const DominoCardList: React.FC<DominoCardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {cards.map((card, index) => (
        <DominoCard key={index} card={card} />
      ))}
    </div>
  );
};

export default DominoCardList;
