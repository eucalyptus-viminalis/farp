"use client";
import Image from "next/image";
import { useContext } from "react";
import { CastPreviewContext } from "../../_context/CastPreviewContext";

type PFPProps = {
  following?: boolean;
};

export default function PFPPreview(props: PFPProps) {
  // Props
  const { following } = props;
  const size = 48;
  const con = useContext(CastPreviewContext);
  const cast = con.cast;
  const margin = con.castType === "root-cast";
  const src = cast.pfpOverride;

  return (
    <span className="relative h-min w-auto" data-state="closed">
      {con.previewMode === "expanded-web" && con.castType === "root-cast" && (
        <div className="relative">
          <Image
            src={src}
            className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
            alt={cast.usernameOverride + " avatar"}
            width={size}
            height={size}
            style={{
              minWidth: `${size}px`,
              minHeight: `${size}px`,
            }}
          />
          {/* <img
                        loading="lazy"
                        src={src}
                        className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
                        alt={cast.usernameOverride + ' avatar'}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            minWidth: `${size}px`,
                            minHeight: `${size}px`,
                        }}
                    /> */}
          {!following && <FollowPlusIcon />}
        </div>
      )}
      {con.previewMode === "expanded-web" && con.castType === "reply" && (
        <div className="relative mr-2">
          <Image
            src={src}
            className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
            alt="avatar"
            width={size}
            height={size}
            style={{
              minWidth: `${size}px`,
              minHeight: `${size}px`,
            }}
          />
          {/* <img
                        loading="lazy"
                        src={src}
                        className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
                        alt="avatar"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            minWidth: `${size}px`,
                            minHeight: `${size}px`,
                        }}
                    /> */}
          {!following && <FollowPlusIcon />}
        </div>
      )}
      {con.previewMode === "expanded-web" &&
        con.castType === "nested-reply" && (
          <div className="relative mr-2">
            <Image
              src={src}
              className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
              alt="avatar"
              width={36}
              height={36}
              style={{
                minWidth: `36px`,
                minHeight: `36px`,
              }}
            />
            {/* <img
                        loading="lazy"
                        src={src}
                        className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
                        alt="avatar"
                        style={{
                            width: `36px`,
                            height: `36px`,
                            minWidth: `36px`,
                            minHeight: `36px`,
                        }}
                    /> */}
            {!following && <FollowPlusIcon />}
          </div>
        )}

      {con.previewMode === "timeline-web" && con.castType === "root-cast" && (
        <div className="relative mr-2">
          <Image
            src={src}
            className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
            alt={cast.usernameOverride + " avatar"}
            width={size}
            height={size}
            style={{
              minWidth: `${size}px`,
              minHeight: `${size}px`,
            }}
          />
          {/* <img
                        loading="lazy"
                        src={src}
                        className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default`}
                        alt={cast.usernameOverride + ' avatar'}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            minWidth: `${size}px`,
                            minHeight: `${size}px`,
                        }}
                    /> */}
          {!following && <FollowPlusIcon />}
        </div>
      )}
    </span>
  );
}

function FollowPlusIcon() {
  return (
    <div className="absolute bottom-0 right-0 mb-[-4px] mr-[-4px] flex h-[20px] w-[20px] items-center justify-center rounded-full border-[2px] bg-[#E2D8F4] border-app hover:bg-[#c1a9df]">
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        className="text-[#8A63D2]"
        viewBox="0 0 16 16"
        width="12.5"
        height="12.5"
        fill="currentColor"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          overflow: "visible",
        }}
      >
        <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
      </svg>
    </div>
  );
}
