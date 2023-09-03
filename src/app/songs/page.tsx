import { getAccessToken } from "@/utils/getAccessToken";
import { Inter } from "next/font/google";
import Image from "next/image";
import SpotifyWebApi from "spotify-web-api-node";
import { z } from "zod";
import { GridLayout } from "../GridLayout";

const inter = Inter({ subsets: ["latin"] });

export default async function Songs({
  searchParams,
}: {
  searchParams?: { time_range?: string };
}) {
  const token = await getAccessToken();

  const spotifyWebApi = new SpotifyWebApi({
    accessToken: token,
  });

  const validTimeRanges = z.enum(["short_term", "medium_term", "long_term"]);

  const timeRange = validTimeRanges.safeParse(searchParams?.time_range).success
    ? (searchParams?.time_range as "short_term" | "medium_term" | "long_term")
    : "long_term";

  const songs = (
    await spotifyWebApi.getMyTopTracks({
      limit: 100,
      time_range: timeRange,
    })
  ).body.items;

  return (
    <>
      <GridLayout>
        {songs.map((song, index) => (
          <div key={song.id} className="">
            <div className="relative aspect-square w-full">
              <Image
                src={song.album.images[0]?.url}
                alt={song.name + " image"}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 text-sm">{song.name}</p>
            <p className="mt-1 text-sm text-gray-200">
              {song.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ))}
      </GridLayout>
    </>
  );
}
