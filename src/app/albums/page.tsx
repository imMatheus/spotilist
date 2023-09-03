import { Inter } from "next/font/google";

import { cookies } from "next/headers";
import SpotifyWebApi from "spotify-web-api-node";
import { SlideSelector } from "../SlideSelector";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default async function Albums() {
  return (
    <main className={inter.className}>
      <h1>ghgh - albums</h1>

      <SlideSelector />
    </main>
  );
}
