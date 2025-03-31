"use client";

import { useContext } from "react";
import { CastEditProvider } from "@/app/(cast)/_context/CastEditContext";
import CastEdit from "@/app/(cast)/_ui/CastEdit.castEditContext";
import KOLSection from "./(cast)/_ui/KOLS";
import { EditContext } from "./_context/EditContext";
import { GlobalContext } from "./_context/GlobalContext";
import PreviewNode from "./(cast)/_ui/PreviewNode";
import { Metadata } from "next";

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
          <KOLSection />
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
