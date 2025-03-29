import React from "react";
import MessageText from "./MessageText";

type MessageImageProps = {
  imgSrc: string;
  timeDisplay: string;
  castText?: string;
  translate?: number;
  index: number;
  isSelfDC?: boolean;
};
export default function MessageImage(props: MessageImageProps) {
  const { imgSrc, timeDisplay, isSelfDC, translate, index, castText } = props;
  return (
    <div
      data-index={index}
      className={`
                    w-full
                    ${translate && "absolute top-0"}
                    ${!translate && ""}
                `}
      //   style={{ transform: "translateY(1079px) scaleY(-1)" }}
      style={{
        transform: translate
          ? `translateY(${translate}px) scaleY(-1)`
          : "scaleY(-1)",
        // transform: translate ? `translateY(${translate}px) scaleY(-1)` : '',
      }}
    >
      <div className="mr-[2px] flex flex-col">
        <div className="group flex max-w-[80%] flex-row self-start mb-1">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col">
                {/* <div className="relative flex flex-col bg-direct-cast rounded-xl"> */}
                <div
                  className={`
                                        relative flex flex-col bg-direct-cast
                                        ${castText ? "rounded-t" : "rounded-xl"}
                                    `}
                >
                  <img
                    loading="lazy"
                    src={imgSrc}
                    // className="relative max-h-[500px] w-full cursor-pointer object-cover object-top bg-overlay-light active:opacity-90 rounded-xl border border-default"
                    className={`
                                            relative max-h-[500px] w-full
                                            cursor-pointer
                                            object-cover object-top
                                            bg-overlay-light
                                            active:opacity-90
                                            ${castText ? "rounded-t" : "rounded-xl"}
                                            ${castText ? "" : "border border-default"}
                                        `}
                    alt="Direct cast image embed"
                    // style={{
                    //     width: "1078px",
                    //     aspectRatio: "0.45 / 1",
                    // }}
                  />
                  {!castText && (
                    <div className="absolute bottom-0 right-0 mb-2 mr-1 flex w-min flex-row items-center rounded-full bg-[#24292ed6] pl-1">
                      <div className="ml-2 mr-1 inline-flex">
                        <div className="mr-2 min-w-[50px] text-xs text-muted w-max !min-w-0 !text-light">
                          {timeDisplay}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {castText && (
                  // <CaptionWithTimestamp
                  //     castText={castText}
                  //     timeDisplay={timeDisplay}
                  // />
                  <MessageText
                    castText={castText}
                    timeDisplayString={timeDisplay}
                    asCaption
                    isSelfDC={isSelfDC}
                  />
                )}
                <div
                  //   type="button"
                  id="radix-:rv7:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                ></div>
              </div>
              <div className="flex items-center space-x-3 opacity-0 transition-all group-hover:opacity-100 ml-2 flex-row">
                <div className="flex flex-row gap-2 text-muted hover:text-muted-light">
                  <div>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      className="cursor-pointer"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      fill="currentColor"
                      style={{
                        display: "inline-block",
                        verticalAlign: "text-bottom",
                        overflow: "visible",
                      }}
                    >
                      <path d="M6.78 1.97a.75.75 0 0 1 0 1.06L3.81 6h6.44A4.75 4.75 0 0 1 15 10.75v2.5a.75.75 0 0 1-1.5 0v-2.5a3.25 3.25 0 0 0-3.25-3.25H3.81l2.97 2.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L1.47 7.28a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"></path>
                    </svg>
                  </div>
                  <div
                    // type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:rv9:"
                    data-state="closed"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      className="cursor-pointer"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      fill="currentColor"
                      style={{
                        display: "inline-block",
                        verticalAlign: "text-bottom",
                        overflow: "visible",
                      }}
                    >
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
