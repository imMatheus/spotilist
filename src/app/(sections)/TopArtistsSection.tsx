import { GridLayout } from "@/components/GridLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { getAccessToken } from "@/utils/getAccessToken";
import Image from "next/image";
import React, { Suspense } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { z } from "zod";
import { type TimeRange } from "../page";

interface TopArtistsSectionProps {
  timeRange: TimeRange;
}

export const TopArtistsSection: React.FC<TopArtistsSectionProps> = ({
  timeRange,
}) => {
  return (
    <Suspense fallback={<p className="bg-blue-500">3333...</p>}>
      {/* @ts-expect-error Server Component */}
      <TopArtistsList timeRange={timeRange} />
    </Suspense>
  );
};

const TopArtistsList = async ({ timeRange }: TopArtistsSectionProps) => {
  const token = await getAccessToken();

  const spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const artists = (
    await spotifyApi.getMyTopArtists({
      limit: 50,
      offset: 0,
      time_range: timeRange,
    })
  ).body.items;

  return (
    <>
      <SectionHeader
        text="Top artists"
        secondaryText="Yeah, I like Drake, I know"
      />

      <GridLayout>
        {artists.map((artist, index) => (
          <div key={artist.id}>
            <div className="relative aspect-square w-full">
              <Image
                src={artist.images[0].url}
                alt={artist.name + " image"}
                fill={true}
                sizes="100vw"
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 text-center text-sm md:text-base">
              <span className="text-gray-400">{index + 1}.</span> {artist.name}
            </p>
          </div>
        ))}
      </GridLayout>
    </>
  );
};
