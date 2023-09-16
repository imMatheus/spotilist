import { Suspense } from "react";
import "./globals.css";
import { PlayedHistory } from "../components/PlayedHistory";
import { SlideSelector } from "../components/SlideSelector";
import { TimeSlider } from "../components/TimeSlider";
import Image from "next/image";
import { IntroSection } from "./(sections)/IntroSection";
import { SelfieSection } from "./(sections)/SelfieSection";
import { RecentlyPlayedSection } from "./(sections)/RecentlyPlayedSection";

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
          <IntroSection />
          <SelfieSection />
          <RecentlyPlayedSection />

          <div className="relative">
            {children}
            <TimeSlider />
          </div>
        </div>
      </body>
    </html>
  );
}
