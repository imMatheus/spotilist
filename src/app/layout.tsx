import { Suspense } from "react";
import "./globals.css";
import { PlayedHistory } from "../components/PlayedHistory";
import { SlideSelector } from "../components/SlideSelector";
import { TimeSlider } from "../components/TimeSlider";
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
        <div className="relative z-10 px-3 pt-5 md:px-4">
          <div className="relative mb-4">
            <h1 className="text-2xl font-bold tracking-widest">
              Matheus Music
            </h1>
            <p className="text-sm text-gray-400 md:text-base">
              I like music, <span className="font-serif italic">A LOT</span>,
              and this is an insight to what im listning to
            </p>
          </div>

          <div className="my-2">
            <div className="">
              <h3 className="text-gray-400">
                Me whenever Drake drops{" "}
                <span className="font-bold">{'"For all the dogs"'}</span>
              </h3>
            </div>
            <div className="flex h-32 w-full max-w-xl gap-2">
              <div className="relative h-full w-full">
                <Image
                  alt=""
                  fill
                  src="/me-1.JPG"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="relative h-full w-full">
                <Image
                  alt=""
                  fill
                  src="/me-2.JPG"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="relative hidden h-full w-full md:block">
                <Image
                  alt=""
                  fill
                  src="/me-3.JPG"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
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
