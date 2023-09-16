"use client";

import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";

interface PlayedHistoryListProps {
  recentlyPlayedTracks: SpotifyApi.PlayHistoryObject[];
}

export const PlayedHistoryList: React.FC<PlayedHistoryListProps> = ({
  recentlyPlayedTracks,
}) => {
  const [showMore, setShowMore] = useState(false);

  function getTimeSince(date: Date) {
    const now = new Date();
    const elapsedTimeInSeconds = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );

    if (elapsedTimeInSeconds < 60) {
      return "a few seconds ago";
    } else if (elapsedTimeInSeconds < 3600) {
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (elapsedTimeInSeconds < 86400) {
      const hours = Math.floor(elapsedTimeInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      const days = Math.floor(elapsedTimeInSeconds / 86400);
      return rtf.format(-days, "day");
    }
  }

  const reducedList = showMore
    ? recentlyPlayedTracks
    : recentlyPlayedTracks.slice(0, 10);

  return (
    <div className="relative overflow-hidden">
      <ul>
        {reducedList.map(({ track, played_at }) => {
          return (
            <li key={played_at}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden">
                    <Image
                      src={track.album.images[0].url}
                      width={48}
                      height={48}
                      alt={`${track.name} album over`}
                    />
                  </div>
                  <div className="truncate leading-tight">
                    <h4 className="truncate text-lg font-bold">{track.name}</h4>
                    <p className="text-sm text-gray-400">
                      {track.artists.map((artist) => artist.name).join(" • ")}
                    </p>
                  </div>
                </div>
                <time
                  className="text-right text-sm text-gray-400"
                  dateTime={played_at}
                  title={new Date(played_at).toUTCString()}
                >
                  {getTimeSince(new Date(played_at))}
                </time>
              </div>
              <hr className="my-2 border-white/5" />
            </li>
          );
        })}
      </ul>
      <div
        className={cn(
          "sticky bottom-0 flex w-full items-center justify-center py-4"
        )}
      >
        <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm"></div>
        <Button
          className="z-10"
          onClick={() => {
            setShowMore((c) => !c);
          }}
        >
          {showMore ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};
