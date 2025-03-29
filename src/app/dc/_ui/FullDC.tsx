import TopNav from "./top-nav/TopNav";

export type Reaction = {
  icon: string;
  count: number;
};

export default function FullDC() {
  return (
    <div className="h-full w-full relative h-screen max-h-screen w-full grow">
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full flex-col justify-center border-b bg-app border-default">
          <TopNav />
        </div>
        <div className="flex h-full flex-col overflow-hidden pl-2">
          {/* Scrollable area */}
          <div
            className="scrollbar-vert mt-0.5 h-full w-full overflow-auto scroll-auto"
            // style={{ transform: "scaleY(-1)" }}
          >
            <div
              className="relative min-h-full w-full flex flex-col justify-start"
              style={{
                // height: "400px",
                transform: "scaleY(-1)",
              }}
            >
              {/* DCs */}
              {/* {dcArr.map((dc, i) => (
                                <Message
                                    key={i}
                                    castText={dc.txt}
                                    index={i}
                                    timeDisplayString={dc.timeDisplay}
                                    // translate={50}
                                    isSelfDC={dc.isSelfDC}
                                    bigGap={(i === 0 || dcArr[i].isSelfDC !== dcArr[i-1].isSelfDC)}
                                />
                            ))} */}
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-row justify-between border-t p-3 bg-overlay-faint border-default">
          <input
            type="file"
            className="w-full rounded border p-2 text-sm bg-input border-default text-default hidden"
            id="dc-img-input"
            accept="image/jpeg,image/jpg,image/png"
          />
          <div
            className="flex cursor-pointer flex-row items-center rounded-md p-1 px-4 py-2 !rounded-full hover:!bg-overlay-faint"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r87:"
            data-state="closed"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              className="text-action-purple"
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
          <button
            className="rounded-lg font-semibold border border-transparent bg-action-primary text-light active:border-action-primary-active disabled:bg-action-primary-disabled disabled:text-action-primary-disabled disabled:active:border-transparent px-[0.9333rem] py-[0.4333rem] text-sm !mb-[1px] flex h-[40px] w-[40px] min-w-[40px] items-center justify-center self-end !rounded-full !bg-transparent !p-0 hover:!bg-overlay-faint disabled:hover:!bg-transparent"
            type="button"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              className="text-action-purple"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              style={{
                display: "inline-block",
                verticalAlign: "text-bottom",
                overflow: "visible",
              }}
            >
              <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path>
            </svg>
          </button>
          <div className="relative scrollbar-vert mx-1 max-h-[600px] min-h-[40px] w-[332pt] overflow-hidden overflow-y-auto break-words rounded border p-2 px-3 text-sm bg-input text-default border-default">
            <div className="DraftEditor-root">
              <div className="DraftEditor-editorContainer">
                <div
                  aria-autocomplete="list"
                  aria-expanded={false}
                  className="notranslate public-DraftEditor-content"
                  contentEditable={true}
                  role="combobox"
                  spellCheck={true}
                  style={{
                    outline: "currentColor",
                    WebkitUserSelect: "text",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <div data-contents="true">
                    <div
                      className=""
                      data-block="true"
                      data-editor="dkia5"
                      data-offset-key="ekbck-0-0"
                    >
                      <div
                        data-offset-key="ekbck-0-0"
                        className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"
                      >
                        <span data-offset-key="ekbck-0-0">
                          <br data-text="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="rounded-lg font-semibold border border-transparent bg-action-primary text-light active:border-action-primary-active disabled:bg-action-primary-disabled disabled:text-action-primary-disabled disabled:active:border-transparent px-[0.9333rem] py-[0.4333rem] text-sm !mb-[1px] flex h-[40px] w-[40px] min-w-[40px] items-center justify-center self-end !rounded-full !p-0 !text-action-purple bg-action disabled:!bg-overlay-medium">
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              className="pl-[3px] text-light"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="currentColor"
              style={{
                display: "inline-block",
                verticalAlign: "text-bottom",
                overflow: "visible",
              }}
            >
              <path d="M1.513 1.96a1.374 1.374 0 0 1 1.499-.21l19.335 9.215a1.147 1.147 0 0 1 0 2.07L3.012 22.25a1.374 1.374 0 0 1-1.947-1.46L2.49 12 1.065 3.21a1.375 1.375 0 0 1 .448-1.25Zm2.375 10.79-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 0 1 0 1.5Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
