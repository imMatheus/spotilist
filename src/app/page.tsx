import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import { z } from "zod";
import { getAccessToken } from "@/utils/getAccessToken";
import { GridLayout } from "./GridLayout";
import { SectionHeader } from "@/components/SectionHeader";

export default async function Home({
  searchParams,
}: {
  searchParams?: { time_range?: string };
}) {
  const token = await getAccessToken();

  const validTimeRanges = z.enum(["short_term", "medium_term", "long_term"]);

  const timeRange = validTimeRanges.safeParse(searchParams?.time_range).success
    ? (searchParams?.time_range as "short_term" | "medium_term" | "long_term")
    : "long_term";

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

  const songs = (
    await spotifyApi.getMyTopTracks({
      limit: 100,
      time_range: timeRange,
    })
  ).body.items;

  return (
    <>
      {/* 
      <Link
        href={
          "https://accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            // show_dialog: true,
          })
        }
      >
        <button className="bg-red-500 p-3">login</button>
      </Link> */}

      <SectionHeader
        text="Top artists"
        secondaryText="Yeah, I like Drake, I know :/"
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
                className="rounded-full md:rounded-none"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 text-center text-sm md:text-base">
              <span className="text-gray-400">{index + 1}.</span> {artist.name}
            </p>
          </div>
        ))}
      </GridLayout>

      <SectionHeader
        text="Top songs"
        secondaryText="IDK how some of these songs ended up here, must have been a phase 😩"
      />

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
