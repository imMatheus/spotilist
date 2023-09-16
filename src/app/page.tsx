import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import { z } from "zod";
import { getAccessToken } from "@/utils/getAccessToken";
import { GridLayout } from "../components/GridLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { TopArtistsSection } from "./(sections)/TopArtistsSection";
import { TopSongsSection } from "./(sections)/TopSongsSection";

const validTimeRanges = ["short_term", "medium_term", "long_term"] as const;
export type TimeRange = (typeof validTimeRanges)[number];

export default async function Home({
  searchParams,
}: {
  searchParams?: { time_range?: string };
}) {
  const token = await getAccessToken();

  const ValidTimeRanges = z.enum(validTimeRanges);

  const timeRange = ValidTimeRanges.safeParse(searchParams?.time_range).success
    ? (searchParams?.time_range as TimeRange)
    : "long_term";

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

      <TopArtistsSection timeRange={timeRange} />
      <TopSongsSection timeRange={timeRange} />
    </>
  );
}
