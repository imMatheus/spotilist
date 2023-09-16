import React from "react";
import { GridLayout } from "../components/GridLayout";

export default function loading() {
  return (
    <GridLayout>
      {Array(50)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square bg-neutral-700"></div>
            <div className="mt-3 h-3 w-3/5 bg-neutral-700"></div>
            <div className="mt-1 h-3 w-2/5 bg-neutral-700"></div>
          </div>
        ))}
    </GridLayout>
  );
}
