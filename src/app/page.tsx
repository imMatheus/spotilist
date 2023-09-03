import { Inter } from "next/font/google";
import SpotifyWebApi from "spotify-web-api-node";
import Image from "next/image";
import { z } from "zod";
import { getAccessToken } from "@/utils/getAccessToken";
import axios from "axios";
import Link from "next/link";
import querystring from "querystring";

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

  const client_id = "98da74fcc2e84e5c9745f463fca947ae";
  const client_secret = "638ce3916f81431d8db3c9de7ff489b6";

  const scopes = [
    "playlist-read-collaborative",
    "playlist-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-position",
    "user-read-currently-playing",
    "user-read-recently-played",
  ];

  function generateRandomString(length: number): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomCharacters = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomCharacters += charset[randomIndex];
    }

    return randomCharacters;
  }
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";
  const redirect_uri = "http://localhost:3000/";
  const code =
    "AQDF8ak7X90DeJh5PPo_JSPfJn5JmK4i0_lyvpUxmuzPa1eV7xXiw3jZOS4XbyH3XBVdNXFB6h1VHV3EbydV4Wa-9hwFRrCQjl4KZO4emiSTWOZ0q8Eivod7NXtrrFBhVrafT7QWWdMSZoTFka5GAC0KGMbasLeV7IOLJRAkrfoIIHiot128djZiMB5jr7YPI3pGBd9oLjMXayUO_6c";

  async function test() {
    try {
      console.log("999999999999");

      const { status, data, statusText } = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        {
          headers: {
            Authorization:
              "Basic " +
              new Buffer(client_id + ":" + client_secret).toString("base64"),
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log({ status, data, statusText });
    } catch (error: any) {
      console.log("maaatheuusss");
      console.log(error);
      console.log("maaatheuusss");
    }
  }

  //   test();

  return (
    <>
      wag1
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
      </Link>
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
