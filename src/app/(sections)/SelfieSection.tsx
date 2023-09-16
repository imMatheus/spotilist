import Image from "next/image";
import React from "react";

export const SelfieSection: React.FC = ({}) => {
  return (
    <div className="my-2">
      <div className="">
        <h3 className="text-gray-400">
          Me whenever Drake drops{" "}
          <span className="font-bold">{'"For all the dogs"'}</span>
        </h3>
      </div>
      <div className="flex h-32 w-full max-w-xl gap-2">
        <div className="relative h-full w-full">
          <Image alt="" fill src="/me-1.JPG" style={{ objectFit: "contain" }} />
        </div>
        <div className="relative h-full w-full">
          <Image alt="" fill src="/me-2.JPG" style={{ objectFit: "contain" }} />
        </div>
        <div className="relative hidden h-full w-full md:block">
          <Image alt="" fill src="/me-3.JPG" style={{ objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
};
