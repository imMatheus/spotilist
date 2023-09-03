import { Inter } from "next/font/google";
import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import { z } from "zod";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";
import Link from "next/link";
import querystring from "querystring";
import { GridLayout } from "./GridLayout";

const inter = Inter({ subsets: ["latin"] });

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

      <GridLayout>
        {artists.map((artist, index) => (
          <div key={artist.id}>
            <div className="relative aspect-square w-full">
              <Image
                src={artist.images[0].url}
                alt={artist.name + " image"}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3">
              {index + 1} - {artist.name}
            </p>
          </div>
        ))}
      </GridLayout>
    </>
  );
}
