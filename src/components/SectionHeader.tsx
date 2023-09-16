import { cn } from "@/utils/cn";
import React from "react";

interface SectionHeaderProps {
  sticky?: boolean;
  text: string;
  secondaryText: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  sticky = true,
  text,
  secondaryText,
}) => {
  return (
    <div className={cn("z-10 py-4", sticky && "sticky top-0 bg-bg")}>
      <h2 className="text-2xl font-bold leading-9 lg:text-3xl lg:leading-10">
        {text}
      </h2>
      <p className="text-sm text-gray-400 lg:text-base">{secondaryText}</p>
    </div>
  );
};
