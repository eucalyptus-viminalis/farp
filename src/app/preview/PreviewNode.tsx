"use client";

import { PreviewMode } from "@/types/types";
import { useState } from "react";
import ActionButton from "@/components/button/ActionButton";
import TimelineWebPreview from "./TimelineWebPreview";
import ExpandedWebPreview from "./ExpandedWebPreview";

function PreviewNode() {
    // States
    const [previewMode, setPreviewMode] = useState<PreviewMode>("timeline-web");
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
                    p-2
                "
            >
                <ActionButton
                    handleOnClick={() => handleOnClick("timeline-web")}
                    withBg={previewMode === "timeline-web"}
                >
                    {`Timeline (Web)`}
                </ActionButton>
                <ActionButton
                    handleOnClick={() => handleOnClick("expanded-web")}
                    withBg={previewMode === "expanded-web"}
                >
                    {`Expanded (Web)`}
                </ActionButton>
            </div>
            {previewMode === 'timeline-web' && (
                <TimelineWebPreview/>
            )}
            {previewMode === 'expanded-web' && (
                // <ConvoWebNavBar />
                <ExpandedWebPreview/>
            )}
        </>
    );
}

export default PreviewNode;
