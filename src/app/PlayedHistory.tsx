import { getAccessToken } from "@/utils/getAccessToken";
import Image from "next/image";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";

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

  console.log(recentlyPlayedTracks[0].played_at);

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

  return (
    <div className="my-4">
      <h3 className="">Currently playing</h3>
      {currentlyPlayingTrack.item && "album" in currentlyPlayingTrack.item && (
        <div className="flex max-w-max gap-4 rounded-md bg-black p-5">
          <div className="relative aspect-square w-24">
            <Image
              src={currentlyPlayingTrack.item.album.images[0].url}
              alt={currentlyPlayingTrack.item.name + " image"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="">
            <h3 className="mb-1 text-xl font-semibold">
              {currentlyPlayingTrack.item.name}
            </h3>
            <p className="text-gray-200">
              {currentlyPlayingTrack.item.artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
      )}
      <div className="mb-4">
        <div className="sticky top-0 mb-2 bg-bg py-4">
          <h2 className="text-2xl font-bold leading-9 lg:text-3xl lg:leading-10">
            Recent streams
          </h2>
          <p className="text-sm text-gray-400 lg:text-base">
            My recently played tracks
          </p>
        </div>
        <ul className="">
          {recentlyPlayedTracks.map(({ track, played_at }) => {
            return (
              <li key={track.id + played_at}>
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
                      <h4 className="truncate text-lg font-bold">
                        {track.name}
                      </h4>
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
      </div>
      {/* <pre>{JSON.stringify(currentlyPlayingTrack.item, null, 2)}</pre> */}
    </div>
  );
};
