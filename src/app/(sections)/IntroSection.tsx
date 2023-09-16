import React from "react";

export const IntroSection: React.FC = ({}) => {
  return (
    <div className="relative mb-4">
      <h1 className="text-2xl font-bold tracking-widest">Matheus Music</h1>
      <p className="text-sm text-gray-400 md:text-base">
        I like music, <span className="font-serif italic">A LOT</span>, and this
        is an insight to what im listning to
      </p>
    </div>
  );
};
