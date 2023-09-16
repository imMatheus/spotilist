import { getAccessToken } from "@/utils/getAccessToken";
import Image from "next/image";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { PlayedHistoryList } from "./PlayedHistoryList";

export const PlayedHistory = async ({}) => {
  const token = await getAccessToken();

  const spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const recentlyPlayedTracks = (
    await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 50,
    })
  ).body?.items;
  const currentlyPlayingTrack = (await spotifyApi.getMyCurrentPlayingTrack())
    .body;

  console.log(currentlyPlayingTrack);

  console.log(recentlyPlayedTracks[0].track.album.images);

  return (
    <div className="my-4">
      {currentlyPlayingTrack.item && "album" in currentlyPlayingTrack.item && (
        <div className="mb-4">
          <div className="sticky top-0 z-10 mb-2 bg-bg py-4">
            <h2 className="text-2xl font-bold leading-9 lg:text-3xl lg:leading-10">
              Currently playing
            </h2>
            <p className="text-sm text-gray-400 lg:text-base">
              This is a certified hood banger!
            </p>
          </div>
          <div className="flex max-w-max gap-3 rounded-md md:gap-4">
            <div className="relative aspect-square h-14 w-14 shrink-0 md:h-20 md:w-20 lg:h-24 lg:w-24">
              <Image
                src={currentlyPlayingTrack.item.album.images[0].url}
                alt={currentlyPlayingTrack.item.name + " image"}
                fill={true}
                sizes="(min-width: 768px) 80px, (min-width: 1024px) 96px, 56px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="">
              <h3 className="mb-1 text-lg font-semibold md:text-xl">
                {currentlyPlayingTrack.item.name}
              </h3>
              <p className="text-sm text-gray-300 md:text-base">
                {currentlyPlayingTrack.item.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <div className="sticky top-0 z-10 mb-2 bg-bg py-4">
          <h2 className="text-2xl font-bold leading-9 lg:text-3xl lg:leading-10">
            Recent streams
          </h2>
          <p className="text-sm text-gray-400 lg:text-base">
            My recently played tracks, don&apos;t judge me I might be going
            though something
          </p>
        </div>
        <PlayedHistoryList recentlyPlayedTracks={recentlyPlayedTracks} />
      </div>
      {/* <pre>{JSON.stringify(currentlyPlayingTrack.item, null, 2)}</pre> */}
    </div>
  );
};
