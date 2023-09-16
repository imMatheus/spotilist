import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-5 xl:grid-cols-5">
      {children}
    </div>
  );
};
