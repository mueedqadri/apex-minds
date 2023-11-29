"use client";

const WordChips = ({ words }: { words: string[] }) => {
  return (
    <div className="word-chips">
      {words.map((word, index) => (
        <div key={index} className="chip">
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordChips;
