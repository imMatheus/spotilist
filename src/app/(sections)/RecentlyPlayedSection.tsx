import { PlayedHistory } from "@/components/PlayedHistory";
import React, { Suspense } from "react";

export const RecentlyPlayedSection: React.FC = ({}) => {
  return (
    <Suspense fallback={<p className="bg-red-500">loading...</p>}>
      {/* @ts-expect-error Server Component */}
      <PlayedHistory />
    </Suspense>
  );
};
