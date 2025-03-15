"use client";
import { GlobalContext } from "@/contexts/GlobalContext";
// import '@/css/dc.css'
import { useContext } from "react";
import KOLSDC from "@/components/dc/kols/KOLS.dcEdit";
import FarpletEditNode from "./_ui/FarpletEditNode";
import FarpletPreviewNode from "./_ui/FarpletPreviewNode";

export default function DCPage() {
  const cx = useContext(GlobalContext);
  const { mode } = cx;
  return (
    <>
      {mode === "edit" && (
        <div className="">
          <KOLSDC />
          <FarpletEditNode />
        </div>
      )}
      {mode === "preview" && <FarpletPreviewNode />}
    </>
  );
}
