"use client";
// import '@/css/dc.css'
import { useContext } from "react";
import { GlobalContext } from "../_context/GlobalContext";
import DCEditNode from "./_ui/DCEditNode.dcEdit";
import DCPreviewNode from "./_ui/DCPreviewNode.dcEdit";
import KOLSection from "./_ui/kols/KOLS.dcEdit";

export default function DCPage() {
  const cx = useContext(GlobalContext);
  const { mode } = cx;
  return (
    <>
      {mode === "edit" && (
        <div className="">
          <KOLSection />
          <DCEditNode />
        </div>
      )}
      {/* {mode === "preview" && <FullDC />} */}
      {mode === "preview" && <DCPreviewNode />}
    </>
  );
}
