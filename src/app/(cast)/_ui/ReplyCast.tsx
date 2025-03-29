import { CastState } from "@/types/types";
import { CastPreview } from "./CastPreview";

type ReplyCastProps = {
  cast: CastState;
  lastToDisplay?: boolean;
  lastIndex?: boolean;
  showingNested?: boolean;
};

export default function ReplyCast(props: ReplyCastProps) {
  const { cast, lastToDisplay, lastIndex } = props;
  return (
    <CastPreview
      cast={cast}
      castType="reply"
      previewMode="expanded-web"
      lastToDisplay={lastToDisplay}
      lastIndex={lastIndex}
      showingNested={props.showingNested}
    />
    // <div>
    //     <div className="relative">
    //         <div className="relative cursor-pointer px-4 py-2 hover:bg-overlay-faint border-t border-faint">
    //             {/* border */}
    //             <div
    //                 className="absolute top-0 w-[1px] border-l-2 border-faint border-none"
    //                 style={{
    //                     left: 38,
    //                     height: 28,
    //                 }}

    //                 // style="left: 38px; height: 28px;"
    //             ></div>
    //             {/* border */}
    //             <div
    //                 className="absolute bottom-0 w-[1px] border-l-2 border-faint border-solid"
    //                 //  style="left: 38px; top: 28px;"
    //                 style={{
    //                     left: 38,
    //                     top: 28,
    //                 }}
    //             ></div>
    //             <div className="relative flex flex-col">
    //                 <div className="relative flex">
    //                     <PFPPreview
    //                         previewMode="expanded-web"
    //                         pfpDisplayType="reply"
    //                         src="/dwr.png"
    //                     />
    //                     {/* Main Content */}
    //                     <div className="relative w-full min-w-0">
    //                         {/* Header row */}
    //                         <CastHeaderPreview
    //                             // displayName={cast.displayNameOverride}
    //                             // username={cast.usernameOverride}
    //                             // activeBadge={cast.activeBadgeOverride}
    //                             // ago={cast.ago}
    //                             displayName={"some display name"}
    //                             username={"some_username"}
    //                             activeBadge={false}
    //                             ago={"1h"}
    //                         />
    //                         {/* Cast Content */}
    //                         <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
    //                             <div className="line-clamp-feed">
    //                                 {/* Style channel/mentions within castText */}
    //                                 {"some cast text here"}
    //                             </div>
    //                             {/* {cast.imageEmbeds && (
    //                     <EmbedsContainerPreview
    //                         imgUrls={cast.imageEmbeds}
    //                     />
    //                 )} */}
    //                         </div>
    //                         {/* <BottomBar /> */}
    //                         <BottomBarPreview />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}
