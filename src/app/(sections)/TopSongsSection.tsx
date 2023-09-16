import { GridLayout } from "@/components/GridLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { getAccessToken } from "@/utils/getAccessToken";
import Image from "next/image";
import React, { Suspense } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { z } from "zod";
import { type TimeRange } from "../page";

interface TopSongsSectionProps {
  timeRange: TimeRange;
}

export const TopSongsSection: React.FC<TopSongsSectionProps> = ({
  timeRange,
}) => {
  return (
    <>
      <SectionHeader
        text="Top songs"
        secondaryText="IDK how some of these songs ended up here, must have been a phase 😩"
      />
      <Suspense
        fallback={
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
        }
      >
        {/* @ts-expect-error Server Component */}
        <TopSongsList timeRange={timeRange} />
      </Suspense>
    </>
  );
};

const TopSongsList = async ({ timeRange }: TopSongsSectionProps) => {
  const token = await getAccessToken();

  const spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });
  const songs = (
    await spotifyApi.getMyTopTracks({
      limit: 100,
      time_range: timeRange,
    })
  ).body.items;

  return (
    <GridLayout>
      {songs.map((song, index) => (
        <div key={song.id} className="">
          <div className="relative mb-2 aspect-square w-full">
            <Image
              loading="lazy"
              src={song.album.images[0]?.url}
              alt={song.name + " image"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="mb-1 text-xs font-medium md:text-sm">{song.name}</p>
          <p className="text-xs text-gray-400 md:text-sm">
            {song.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      ))}
    </GridLayout>
  );
};
