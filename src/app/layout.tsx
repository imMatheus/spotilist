import { Suspense } from "react";
import "./globals.css";
import { PlayedHistory } from "./PlayedHistory";
import { SlideSelector } from "./SlideSelector";
import { TimeSlider } from "./TimeSlider";

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
      <body className="mx-auto max-w-7xl">
        <div className="px-4 py-5">
          <Suspense fallback={<p className="bg-red-500">loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <PlayedHistory />
          </Suspense>
          <SlideSelector />
          <TimeSlider />
          {children}
        </div>
      </body>
    </html>
  );
}
