"use client";

import { PreviewMode } from "@/types/types";
import { useContext, useState } from "react";
import ActionButton from "@/components/button/ActionButton";
import TimelineWebPreview from "./TimelineWebPreview";
import ExpandedWebPreview from "./ExpandedWebPreview";
import PowerbadgeToggle from "./PowerbadgeToggle";
import { GlobalContext } from "@/app/_context/GlobalContext";

function PreviewNode() {
  // States
  const [previewMode, setPreviewMode] = useState<PreviewMode>("timeline-web");
  const cx = useContext(GlobalContext);
  // Handlers
  const handleOnClick = (previewMode: PreviewMode) => {
    setPreviewMode(previewMode);
  };
  return (
    <>
      {/* Mode buttons */}
      <div
        className="
                    flex
                    justify-center
                    gap-1
                    p-1
                "
      >
        <ActionButton
          handleOnClick={() => handleOnClick("timeline-web")}
          withBg={previewMode === "timeline-web"}
        >
          {`Timeline`}
        </ActionButton>
        <ActionButton
          handleOnClick={() => handleOnClick("expanded-web")}
          withBg={previewMode === "expanded-web"}
        >
          {`Expanded`}
        </ActionButton>
      </div>
      <div
        className="
                    flex
                    justify-start
                    gap-1
                    p-2
                "
      >
        <PowerbadgeToggle />
      </div>
      {previewMode === "timeline-web" && <TimelineWebPreview />}
      {previewMode === "expanded-web" && (
        // <ConvoWebNavBar />
        <ExpandedWebPreview />
      )}
    </>
  );
}

export default PreviewNode;
