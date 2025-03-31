"use client";
// import '@/css/dc.css'

import sdk, { Context } from "@farcaster/frame-sdk";
import { useContext, useEffect } from "react";
import FarpletEditNode from "./_ui/FarpletEditNode";
import FarpletPreviewNode from "./_ui/FarpletPreviewNode";
import { GlobalContext } from "../_context/GlobalContext";
import { useFarcasterCtx } from "../_context/FarcasterCtx";

export default function DCPage() {
  const cx = useContext(GlobalContext);
  const { state: fcState } = useFarcasterCtx();
  const { mode } = cx;
  useEffect(() => {
    if (fcState.isSdkLoaded && !fcState.farcasterContext?.client.added) {
      sdk.actions.addFrame();
    }
  });
  return (
    <>
      {mode === "edit" && (
        <div className="">
          <FarpletEditNode />
        </div>
      )}
      {mode === "preview" && <FarpletPreviewNode />}
    </>
  );
}
