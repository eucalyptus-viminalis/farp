'use client'
import { GlobalContext } from "@/contexts/GlobalContext";
// import '@/css/dc.css'
import { useContext } from "react";
import KOLSDC from "@/components/dc/kols/KOLS.dcEdit";
import DCEditNode from "@/components/dc/DCEditNode.dcEdit";
import DCPreviewNode from "@/components/dc/DCPreviewNode.dcEdit";

export default function DCPage() {
    const cx = useContext(GlobalContext);
    const { mode  } = cx;
    return (
        <>
            {mode === "edit" && (
                <div className="">
                    <KOLSDC />
                    <DCEditNode/>
                </div>
            )}
            {/* {mode === "preview" && <FullDC />} */}
            {mode === "preview" && <DCPreviewNode/>}
        </>
    )
}