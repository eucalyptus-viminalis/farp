"use client";

import { GlobalContext } from "@/app/_context/GlobalContext";
import { useContext } from "react";
import { CastPreviewContext } from "../../_context/CastPreviewContext";

export default function DisplayNameConvo() {
  const con = useContext(CastPreviewContext);
  const globalcx = useContext(GlobalContext);
  const cast = con.cast;
  const displayName = cast.displayNameOverride;
  const activeBadge = cast.activeBadgeOverride;

  return (
    <span className="flex flex-row items-center space-x-1">
      <span className="relative h-min w-auto" data-state="closed">
        {/* <a
                    className="text-base  font-semibold text-default hover:underline"
                    title=""
                    href="/drew"
                > */}
        <div className="flex min-w-0 flex-row items-center">
          <span className="!block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap break-words text-default hover:underline text-base font-semibold">
            {displayName}
          </span>
          {globalcx.showPowerbadge && activeBadge && (
            <div className="ml-1 flex flex-row items-center space-x-1">
              <div className="flex flex-shrink-0 items-center justify-center rounded-full text-active-badge h-[14px] w-[14px]">
                <img
                  loading="lazy"
                  src="/ActiveBadge.png"
                  alt="Active Badge"
                  className="object-contain"
                  style={{
                    width: 12,
                    height: 12,
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* </a> */}
      </span>
    </span>
  );
}
