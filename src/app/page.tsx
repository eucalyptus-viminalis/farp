"use client";

import { useContext } from "react";
import { EditContext } from "@/contexts/EditContext";
import { CastEditProvider } from "@/contexts/CastEditContext";
import CastEdit from "@/app/(cast)/_ui/CastEdit.castEditContext";
import PreviewNode from "../components/PreviewNode";
import { GlobalContext } from "@/contexts/GlobalContext";
import FullDC from "@/components/dc/FullDC";
import DCEditNode from "@/components/dc/DCEditNode.dcEdit";
import KOLSDC from "@/components/dc/kols/KOLS.dcEdit";
import KOLS from "./KOLS";
import DCPreviewNode from "@/components/dc/DCPreviewNode.dcEdit";

type EditMode = "edit" | "preview";

export default function EditPage() {
  // Context
  const cx = useContext(GlobalContext);
  const { mode, page } = cx;
  const context = useContext(EditContext);
  const rootCast = context.state.rootCast;

  return (
    <>
      {mode === "edit" && (
        <div className="">
          <KOLS />
          <CastEditProvider
            cast={rootCast}
            castType="root-cast"
            dispatch={context.dispatch}
          >
            <CastEdit />
          </CastEditProvider>
          {rootCast.replies?.map((reply, i) => {
            return (
              <CastEditProvider
                cast={reply}
                key={`reply-cast-edit-${i}`}
                replyIndex={i}
                lastIndex={
                  rootCast.replies ? rootCast.replies.length - 1 === i : true
                }
                castType="reply"
                dispatch={context.dispatch}
              >
                <CastEdit />
              </CastEditProvider>
            );
          })}
        </div>
      )}
      {mode === "preview" && <PreviewNode />}
    </>
  );
}
