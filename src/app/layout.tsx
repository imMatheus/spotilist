import "./globals.css";
import { TimeSlider } from "../components/TimeSlider";
import { IntroSection } from "./(sections)/IntroSection";
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
