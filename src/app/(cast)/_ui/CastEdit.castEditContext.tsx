"use client";
import BottomBar from "../../../components/cast/BottomBar";
// import CastContentEdit from "../cast-content-edit/CastContentEdit-no-fullscreen";
import CastHeader from "../../../components/cast/CastHeader.editContext";
import PFPUploadable from "../../../components/cast/pfp/PFPUploadable.castEditContext";
import { useContext, useEffect } from "react";
import { CastEditContext } from "@/contexts/CastEditContext";
import CastContentEdit from "./cast-content-edit/CastContentEdit.chrome-friendly";
import CastDraftEditor from "./cast-content-edit/CastDraftEditor";
import CastEditLexical from "./cast-content-edit/CastEditLexical";

type Reply = {
  index: number;
};

function CastEdit() {
  const cx = useContext(CastEditContext);
  const cast = cx.cast;
  const castType = cx.castType;

  // useEffect(()=>{
  //     // alert(`replyindex: ${con.replyIndex}`)
  //     alert(`replyCount: ${cast.replyCount}`)
  // },[])

  return (
    <div className="">
      <div className="relative">
        <div
          className={`relative px-4 py-2 hover:bg-overlay-faint ${
            cx.castType === "root-cast" && "border-t border-faint"
          }`}
        >
          {castType === "reply" && (
            <div
              className="absolute top-0 w-[1px] border-l-2 border-faint border-solid"
              style={{
                left: 38,
                height: 28,
              }}
            ></div>
          )}
          {((castType === "root-cast" &&
            (cast.replies ? cast.replies.length > 0 : false)) ||
            (castType === "reply" && !cx.lastIndex)) && (
            // {(castType === "root-cast" && (cast.replies ? cast.replies.length > 0 : false)) && (
            <>
              <div
                className="absolute bottom-0 w-[1px] border-l-2 border-faint border-solid"
                style={{
                  left: 38,
                  top: 28,
                }}
              ></div>
              {/* {!lastIndex && (
                                    <div
                                        className="absolute bottom-0 w-[1px] border-l-2 border-faint border-solid"
                                        style={{
                                            left: 38,
                                            top: 28,
                                        }}
                                    ></div>
                                    )} */}
            </>
          )}
          <div className="relative flex flex-col">
            <div className="relative flex">
              {/* PFP */}
              {/* <PFPUploadable mr size={48} /> */}
              <PFPUploadable mr size={48} />
              {/* Main Content */}
              <div className="relative w-full min-w-0">
                <CastHeader />
                {/* <CastContentEdit /> */}
                {/* <CastDraftEditor /> */}
                <CastEditLexical />
                <BottomBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CastEdit;
