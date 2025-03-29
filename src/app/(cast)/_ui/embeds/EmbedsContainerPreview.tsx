"use client";
import { getContentType } from "@/app/server-actions";
import { isEmbedCastId, isEmbedUrl } from "@/app/(cast)/_data/useRealCasts";
import { Embed } from "@/types/types";
import { CastId } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import React, { useContext, useEffect, useState } from "react";
import { CastPreviewContext } from "@/app/(cast)/_context/CastPreviewContext";

function isImageUrl(url: string) {
  return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg|tiff)$/i) !== null;
}
type ClassifiedEmbeds = {
  images: string[];
  websites: string[];
  quotedCastId: CastId | undefined;
};

const useClassifiedEmbeds = (embeds: Embed[]) => {
  const [classifiedEmbeds, setClassifiedEmbeds] = useState<
    ClassifiedEmbeds | undefined
  >(undefined);
  useEffect(() => {
    async function getEmbedsClassified(embeds: Embed[]) {
      setClassifiedEmbeds(await classifyEmbeds(embeds));
    }
    getEmbedsClassified(embeds);
  }, embeds);
  return { classifiedEmbeds };
};

async function classifyEmbeds(embeds: Embed[]) {
  const classifiedUrls: ClassifiedEmbeds = {
    images: [],
    quotedCastId: undefined,
    websites: [],
  };
  const embedCastIds = embeds.filter(isEmbedCastId).map((e) => e.cast_id);
  if (embedCastIds && embedCastIds.length > 0) {
    // Just take the first cast as quote
    classifiedUrls.quotedCastId = embedCastIds.at(0);
  }
  const embedUrls = embeds.filter(isEmbedUrl).map((e) => e.url);
  for (const url of embedUrls) {
    if (isImageUrl(url)) {
      classifiedUrls.images.push(url);
    } else {
      const contentType = await getContentType(url);
      if (contentType && contentType.startsWith("image/")) {
        classifiedUrls.images.push(url);
      } else {
        classifiedUrls.websites.push(url);
      }
    }
  }

  return classifiedUrls;
}

export default function EmbedsContainerPreview() {
  const cx = useContext(CastPreviewContext);
  const imgUrls = cx.cast.imageEmbeds;
  const [] = useState({});
  const { classifiedEmbeds } = useClassifiedEmbeds(cx.cast.embeds);
  if (!classifiedEmbeds) return null;
  const embeds: ClassifiedEmbeds = {
    ...classifiedEmbeds,
    // websites: ['https://warpcast.com'],
    images: [...classifiedEmbeds.images, ...imgUrls],
  };
  if (!embeds) return null;
  // const { imgUrls } = props;
  return (
    <div className="mt-2 inline-flex flex-col justify-center space-y-1">
      {/* Images */}
      {/* Double image */}
      {embeds.images.length === 2 && (
        <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-full justify-between rounded-lg  border">
          {embeds.images.map((imgUrl, i) => {
            return (
              <img
                key={cx.cast.castHash ? cx.cast.castHash + i : i}
                alt={"Cast image embed " + i}
                loading="lazy"
                src={imgUrl}
                className={`
                                    relative cursor-pointer object-cover object-left-top max-h-[500px]
                                    w-[49.5%]
                                `}
              />
            );
          })}
        </div>
      )}
      {/* Single image */}
      {embeds.images.length === 1 && (
        <div
          className={`flex min-w-0 max-w-full flex-row overflow-hidden border-default w-max justify-start rounded-lg border ${
            cx.previewMode === "expanded-web" &&
            cx.castType === "root-cast" &&
            "!w-full"
          } `}
        >
          {cx.castType === "root-cast" && cx.previewMode === "expanded-web" ? (
            <img
              loading="lazy"
              src={embeds.images.at(0)}
              className="relative cursor-pointer object-cover object-left-top max-h-[2000px] w-full"
              alt="Cast image embed"
            />
          ) : (
            <img
              alt="Cast image embed"
              loading="lazy"
              src={embeds.images.at(0)}
              className="
                    relative cursor-pointer object-cover object-left-top max-h-[500px] w-auto"
            />
          )}
        </div>
      )}
      {/* URLs */}
      {embeds.websites.map((url, i) => {
        return (
          <span key={i}>
            <div className="relative">
              <a
                className="absolute inset-0 subtle-hover-z"
                title={url}
                href={url}
                target="_blank"
              ></a>
              <div
                title={url}
                className="relative flex cursor-pointer rounded-lg text-sm text-inherit bg-app w-full flex-row border p-2 border-default"
              >
                <img
                  loading="lazy"
                  src="/Link.png"
                  alt="OpenGraph image"
                  className="border bg-[#efefef] object-cover border-faint dark:bg-[#17101f] max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] rounded-lg"
                />
                <div className="flex max-h-24 flex-col justify-center overflow-hidden rounded-lg p-2 w-full">
                  <div className="line-clamp-1 text-xs text-muted">{url}</div>
                </div>
              </div>
            </div>
          </span>
        );
      })}
      {/* Quoted Cast */}
    </div>
  );
  // if (imgUrls.length === 1) {
  //     return (
  <div className="mt-2 inline-flex flex-col justify-center space-y-1">
    {/* <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-max justify-start rounded-lg border !w-full"> */}
    <div
      className={`flex min-w-0 max-w-full flex-row overflow-hidden border-default w-max justify-start rounded-lg border ${
        cx.previewMode === "expanded-web" &&
        cx.castType === "root-cast" &&
        "!w-full"
      } `}
    >
      {cx.castType === "root-cast" && cx.previewMode === "expanded-web" ? (
        <img
          loading="lazy"
          src={imgUrls[0]}
          className="relative cursor-pointer object-cover object-left-top max-h-[2000px] w-full"
          alt="Cast image embed"
          // style="aspect-ratio: 0.994118 / 1;"
        />
      ) : (
        <img
          alt="Cast image embed"
          loading="lazy"
          src={imgUrls[0]}
          className="
                    relative cursor-pointer object-cover object-left-top max-h-[500px] w-auto"
          // style={{
          //     aspectRatio: 0.75 / 1,
          // }}
        />
      )}
    </div>
  </div>;
  //     );
  // } else if (imgUrls.length === 2) {
  //     return (
  //         <div className="mt-2 inline-flex flex-col justify-center space-y-1">
  //             {/* Images */}
  // <div className="flex min-w-0 max-w-full flex-row overflow-hidden border-default w-full justify-between rounded-lg  border">
  //     {imgUrls.map((imgUrl, i) => {
  //         return (
  //             <img
  //                 key={i}
  //                 alt={"Cast image embed " + i}
  //                 loading="lazy"
  //                 src={imgUrl}
  //                 className={`
  //                     relative cursor-pointer object-cover object-left-top max-h-[500px]
  //                     w-[49.5%]
  //                 `}
  //                 // style={{
  //                 //     aspectRatio: 0.80803 / 1,
  //                 // }}
  //             />
  //         );
  //     })}
  // </div>
  //             {/* URL Embeds */}
  // <span>
  //     <div className="relative">
  //         <a
  //             className="absolute inset-0 subtle-hover-z"
  //             title="https://status.warpcast.com/"
  //             href="https://status.warpcast.com/"
  //             target="_blank"
  //         ></a>
  //         <div
  //             title="https://status.warpcast.com/"
  //             className="relative flex cursor-pointer rounded-lg text-sm text-inherit bg-app w-full flex-row border p-2 border-default"
  //         >
  //             <img
  //                 loading="lazy"
  //                 src="/~/images/og/Link.png"
  //                 alt="OpenGraph image"
  //                 className="border bg-[#efefef] object-cover border-faint dark:bg-[#17101f] max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] rounded-lg"
  //             />
  //             <div className="flex max-h-24 w-full flex-col justify-center overflow-hidden rounded-lg p-2 w-full">
  //                 <div className="line-clamp-1 text-xs text-muted">
  //                     https://status.warpcast.com/
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // </span>
  //             {/* Quoted Cast */}
  //         </div>
  //     );
  // } else {
  //     return null;
  // }
}
