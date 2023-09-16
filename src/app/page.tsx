import { z } from "zod";
import { TopArtistsSection } from "./(sections)/TopArtistsSection";
import { TopSongsSection } from "./(sections)/TopSongsSection";

const validTimeRanges = ["short_term", "medium_term", "long_term"] as const;
export type TimeRange = (typeof validTimeRanges)[number];

export default async function Home({
  searchParams,
}: {
  searchParams?: { time_range?: string };
}) {
  const ValidTimeRanges = z.enum(validTimeRanges);

  const timeRange = ValidTimeRanges.safeParse(searchParams?.time_range).success
    ? (searchParams?.time_range as TimeRange)
    : "long_term";

  return (
    <>
      <TopArtistsSection timeRange={timeRange} />
      <TopSongsSection timeRange={timeRange} />
    </>
  );
}
