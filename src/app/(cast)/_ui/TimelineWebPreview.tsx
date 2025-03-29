"use client";

import { useContext } from "react";
import { EditContext } from "@/app/_context/EditContext";
import { GlobalContext } from "@/app/_context/GlobalContext";
import { CastPreview } from "./CastPreview";
import TimelineWebNavBarHome from "./TimelineWebNavBarHome";

export default function TimelineWebPreview() {
  // Context
  const con = useContext(EditContext);
  const rootCast = con.state.rootCast;
  const globalCx = useContext(GlobalContext);
  return (
    <>
      {/*
<main
className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
>
    <div className="w-full h-full">
        <div className="h-full min-h-screen border-default sm:border-x"> */}
      {/* Mode buttons */}
      <button
        onClick={globalCx.shuffleCasts}
        className="ml-2 p-2 mb-2 text-[var(--yellow-9)] border border-[var(--yellow-9)] font-semibold sm:hover:bg-[var(--yellow-3)] "
      >
        Shuffle Casts
      </button>
      <TimelineWebNavBarHome />
      {/* Root cast */}
      <CastPreview
        cast={rootCast}
        previewMode={"timeline-web"}
        castType="root-cast"
      />
      {(!globalCx.trendingCasts || globalCx.trendingCasts.length === 0) && (
        <span className="pl-2">Loading trending casts...</span>
      )}
      {globalCx.trendingCasts.map((cast, i) => (
        <CastPreview
          key={cast.castHash ? cast.castHash + i : i}
          castType="root-cast"
          cast={cast}
          previewMode="timeline-web"
        />
      ))}
    </>
  );
}
