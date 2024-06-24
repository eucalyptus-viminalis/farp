import { CastPreview } from "@/components/cast/CastPreview";
import { CastState } from "@/types/types";

type ReplyCastProps = {
    cast: CastState
    lastToDisplay?: boolean
}

export default function NestedReplyCast(props: ReplyCastProps) {
    const {cast,lastToDisplay} = props
    return (
        <CastPreview
            cast={cast} 
            castType="nested-reply"
            previewMode="expanded-web"
            lastToDisplay={lastToDisplay}
        />
    );
}
