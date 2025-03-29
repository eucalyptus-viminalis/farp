"use client";

import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Editor, EditorState, DraftHandleValue } from "draft-js";
import "draft-js/dist/Draft.css";
import { Dispatch, SetStateAction } from "react";

type MessageInputDraftJSProps = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  handleReturn: (
    e: React.KeyboardEvent,
    editorState: EditorState,
  ) => DraftHandleValue;
  handlePastedFiles: (blobs: File[]) => DraftHandleValue;
  image?: string;
  clearImage: () => void;
};

export default function MessageInputDraftJS(props: MessageInputDraftJSProps) {
  const {
    editorState,
    setEditorState,
    clearImage,
    handleReturn,
    image,
    handlePastedFiles,
  } = props;

  return (
    <div
      id="dc-edit-box"
      // other tailwind options
      // className={`
      //     w-[332pt]
      //     text-sm
      // `}
      className={`
        scrollbar-vert
        relative
        mx-1
        max-h-[600px] min-h-[40px]
        overflow-hidden overflow-y-auto break-words
        rounded border
        p-2 px-3
        text-lg
        bg-input
        text-default
        border-[var(--yellow-9)]
      `}
    >
      {image && (
        <div
          id="image-embed-section"
          className={`
            group
            rounded-md
            relative flex flex-col
            overflow-hidden
          `}
        >
          <div className="flex flex-row gap-2">
            <Image
              alt="image embed"
              className={`
                relative max-h-[500px] w-5/6
                object-cover object-top
                rounded border border-default
              `}
              src={image}
              width={800} // Provide a width (in px)
              height={500} // Provide a height (in px)
              style={{ maxHeight: "500px" }} // Tailwind is already doing this, just in case
            />
            <div
              id="clear-image-cross-btn"
              title="clear image"
              className="h-fit flex justify-center items-center w-fit"
            >
              <Cross1Icon
                className="cursor-pointer"
                onClick={clearImage}
                width={20}
                height={20}
                color="var(--yellow-9)"
              />
            </div>
          </div>
        </div>
      )}
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleReturn={handleReturn}
        handlePastedFiles={handlePastedFiles}
        // placeholder="Type your message..."
        spellCheck={true}
      />
    </div>
  );
}
