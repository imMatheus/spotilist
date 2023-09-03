import "./globals.css";
import { SlideSelector } from "./SlideSelector";
import { TimeSlider } from "./TimeSlider";

export const metadata = {
  title: "Spotilist",
  description: "See your stats for Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-7xl">
        <div className="px-4 py-5">
          <SlideSelector />
          <TimeSlider />
          <div className="grid grid-cols-3 gap-5 md:grid-cols-4 xl:grid-cols-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
