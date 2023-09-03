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
    <div className="mb-3 mt-4 flex">
      <LayoutGroup>
        {data.map((point) => (
          <Link
            key={point.text}
            href={`${pathname}?time_range=${point.time_range}`}
            className={classNames("relative px-3 py-1")}
          >
            {point.text}
            {time_range === point.time_range && (
              <motion.div
                layoutId="time-range"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-primary"
              ></motion.div>
            )}
          </Link>
        ))}
      </LayoutGroup>
    </div>
  );
};
