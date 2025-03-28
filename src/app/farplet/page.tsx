"use client";
// import '@/css/dc.css'
import { useContext } from "react";
import FarpletEditNode from "./_ui/FarpletEditNode";
import FarpletPreviewNode from "./_ui/FarpletPreviewNode";
import { GlobalContext } from "../_context/GlobalContext";

export default function DCPage() {
  const cx = useContext(GlobalContext);
  const { mode } = cx;
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
