import { PreviewMode } from "@/types/types";
import { CastType } from "@/types/types";
import { CastState } from "@/types/types";
import React, { ReactNode } from "react";
import { ROOT_CAST_DEFAULT } from "./CastEditContext";

export type CastPreviewContext = {
  cast: CastState;
  castType: CastType;
  replyIndex?: number;
  lastIndex?: boolean;
  previewMode: PreviewMode;
};

export const CAST_PREVIEW_CONTEXT_DEFAULT: CastPreviewContext = {
  cast: ROOT_CAST_DEFAULT,
  castType: "root-cast",
  previewMode: "timeline-web",
};
export const CastPreviewContext = React.createContext<CastPreviewContext>(
  CAST_PREVIEW_CONTEXT_DEFAULT,
);

export type CastPreviewProviderProps = {
  children: ReactNode;
  cast: CastState;
  castType: CastType;
  replyIndex?: number;
  lastIndex?: boolean;
  previewMode: PreviewMode;
};
export function CastPreviewProvider(props: CastPreviewProviderProps) {
  const { cast, castType, children, previewMode, lastIndex, replyIndex } =
    props;
  return (
    <CastPreviewContext.Provider
      value={{
        cast,
        castType,
        previewMode,
        lastIndex,
        replyIndex,
      }}
    >
      {children}
    </CastPreviewContext.Provider>
  );
}
