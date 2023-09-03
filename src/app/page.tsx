import { Inter } from "next/font/google";
import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import { z } from "zod";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default async function Home({
  searchParams,
}: {
  searchParams?: { time_range?: string };
}) {
  const token = await getAccessToken();
  //   const token =
  //     "BQD88OqEpOPGDigZNOgEbom9kgQ6HR8R6Uzc7ERwEDY0LFIkyptraOUDhgmHJiTNxauOLCs";
  //   const token =
  //     "BQDH97yzctlB8-qzlpj0qOkdKlKGvZQ2C75OzhEh7FIRKQ1o6DmWdi9mZwVLrJkdO7XiJVGwdcoTgudPgUzA6aHRixb4TH71Ok5trkdyB9WRcX_f_1Vjw_L6AeeLfFzR6n3_KbdlWCP0fpEdwmtzvVobo8YLnwY4baD4s-RwF8Q3Ivk3z5kTb5utyYnvdLmQUxEcznFjzzRbX3V_6Dp2hK9l4FKac40Bat_x6mHGw_Wf8zIat-NripvkjVEMJksW0MRcmeM5ny_urJq2D58";

  console.log(token);
  console.log("jjjajajaajajaj");

  const validTimeRanges = z.enum(["short_term", "medium_term", "long_term"]);

  const timeRange = validTimeRanges.safeParse(searchParams?.time_range).success
    ? (searchParams?.time_range as "short_term" | "medium_term" | "long_term")
    : "long_term";

  try {
    const hh = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        body: JSON.stringify(undefined),
      }
    );
    // const body = await hh.json();

    console.log("asasasas");
    console.log(hh.status);
    console.log(hh.statusText);
    console.log(hh.ok);
    // console.log(body);

    // console.log(hh);
  } catch (error) {
    console.log("eeeeeee");
    console.log(error);
  }
  console.log(555555);

  const artists: string[] = [];

  return (
    <>
      wag1
      {artists.map((artist: any, index: any) => (
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
    </>
  );
}
