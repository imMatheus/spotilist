import { PlayedHistory } from "@/components/PlayedHistory";
import { SectionHeader } from "@/components/SectionHeader";
import React, { Suspense } from "react";

export const RecentlyPlayedSection: React.FC = ({}) => {
  return (
    <Suspense
      fallback={
        <>
          <SectionHeader
            text="Recent streams"
            secondaryText="My recently played tracks, don't judge me I might be going though something"
          />
          <ul>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <li
                  key={index}
                  className="mb-1 flex animate-pulse items-center gap-2"
                >
                  <div className="h-12 w-12 rounded-full bg-neutral-700"></div>
                  <div className="w-1/5">
                    <div className="mb-1 h-3 w-1/2 bg-neutral-700"></div>
                    <div className="h-3 w-1/4 bg-neutral-700"></div>
                  </div>
                  <div className="ml-auto mt-1 h-3 w-1/12 bg-neutral-700"></div>
                </li>
              ))}
          </ul>
        </>
      }
    >
      {/* @ts-expect-error Server Component */}
      <PlayedHistory />
    </Suspense>
  );
};
