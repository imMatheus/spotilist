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
                  <div className="h-12 w-12 bg-neutral-700"></div>
                  <div>
                    <div className="mb-1 h-3 w-20 bg-neutral-700 md:w-28"></div>
                    <div className="h-3 w-16 bg-neutral-700 md:w-20"></div>
                  </div>
                  <div className="ml-auto mt-1 h-3 w-7 bg-neutral-700 md:w-10"></div>
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
