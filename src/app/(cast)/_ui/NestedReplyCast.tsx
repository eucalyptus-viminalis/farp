import { CastState } from "@/types/types";
import { CastPreview } from "./CastPreview";

type ReplyCastProps = {
  cast: CastState;
  lastToDisplay?: boolean;
};

export default function NestedReplyCast(props: ReplyCastProps) {
  const { cast, lastToDisplay } = props;
  return (
    <CastPreview
      cast={cast}
      castType="nested-reply"
      previewMode="expanded-web"
      lastToDisplay={lastToDisplay}
    />
  );
}
