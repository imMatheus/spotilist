import { Suspense } from "react";
import "./globals.css";
import { PlayedHistory } from "./PlayedHistory";
import { SlideSelector } from "./SlideSelector";
import { TimeSlider } from "./TimeSlider";
import Image from "next/image";

export const metadata = {
  title: "Matheus Music",
  description: "See what music Matheus been listening to",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative mx-auto max-w-7xl">
        <div className="absolute h-52 w-full">
          <Image
            alt="wave background image"
            fill
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="/bg-waves-2.svg"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 px-4 pt-5">
          <div className="relative mb-4">
            <h1 className="text-2xl font-bold tracking-widest">
              Matheus Music
            </h1>
            <p className="text-sm text-gray-400 md:text-base">
              I like music, <span className="font-serif italic">A LOT</span>,
              and this is an insight to what im listning to
            </p>
          </div>

          <Suspense fallback={<p className="bg-red-500">loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <PlayedHistory />
          </Suspense>
          {/* <SlideSelector /> */}
          <div className="relative">
            {children}
            <TimeSlider />
          </div>
        </div>
      </body>
    </html>
  );
}
