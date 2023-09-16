"use client";

import classNames from "classnames";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export const TimeSlider: React.FC = ({}) => {
  const data = [
    {
      text: "Lifetime",
      time_range: "long_term",
    },
    {
      text: "6 months",
      time_range: "medium_term",
    },
    {
      text: "4 weeks",
      time_range: "short_term",
    },
  ];

  const search = useSearchParams();
  const searchTimeRange = search.get("time_range") || "";
  const pathname = usePathname();

  const time_range = ["short_term", "medium_term", "long_term"].includes(
    searchTimeRange
  )
    ? searchTimeRange
    : "long_term"; // default
  return (
    <div className="sticky bottom-3 z-10 mx-auto mt-10 flex w-full max-w-md rounded-full bg-black">
      <LayoutGroup>
        {data.map((point) => (
          <Link
            key={point.text}
            href={`${pathname}?time_range=${point.time_range}`}
            className={classNames(
              "relative flex-1 cursor-pointer px-4 py-1.5 text-center transition-all",
              time_range === point.time_range
                ? "text-black"
                : "hover:opacity-90"
            )}
          >
            <p className="relative z-10 text-sm font-semibold md:text-base">
              {point.text}
            </p>
            {time_range === point.time_range && (
              <motion.div
                layoutId="time-range"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="absolute inset-0 rounded-full bg-primary"
              ></motion.div>
            )}
          </Link>
        ))}
      </LayoutGroup>
    </div>
  );
};
