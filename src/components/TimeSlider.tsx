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
    <div className="sticky bottom-0 z-10 mt-3 flex w-full bg-bg">
      <LayoutGroup>
        {data.map((point) => (
          <Link
            key={point.text}
            href={`${pathname}?time_range=${point.time_range}`}
            className={classNames("relative flex-1 px-3 py-2 text-center")}
          >
            <p className="text-sm font-semibold">{point.text}</p>
            {time_range === point.time_range && (
              <motion.div
                layoutId="time-range"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="absolute bottom-0 left-0 right-0 h-[2px] w-full bg-primary"
              ></motion.div>
            )}
          </Link>
        ))}
      </LayoutGroup>
    </div>
  );
};
