"use client";

import { useContext } from "react";
import { FarpletContext } from "@/contexts/FarpletContext";

type PFPProps = {
  size?: number;
};

export default function PFP(props: PFPProps) {
  // Props
  const { size } = props;
  const pfpSize = size ?? 36;

  // Context
  const cx = useContext(FarpletContext);

  // DOM
  return (
    <span
      title={(cx.state.user?.username ?? "unknown user") + " pfp"}
      className="relative inline-block h-min shrink-0"
    >
      <img
        loading="lazy"
        src={cx.state.pfpOverride}
        className={`
                    aspect-square
                    shrink-0
                    rounded-full
                    border border-default
                    object-cover
                    bg-app
                `}
        alt="avatar"
        style={{
          width: `${pfpSize}px`,
          height: `${pfpSize}px`,
          minWidth: `${pfpSize}px`,
          minHeight: `${pfpSize}px`,
        }}
      />
    </span>
  );
}
