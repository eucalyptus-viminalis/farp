"use client";
import { MouseEvent, useContext, useState } from "react";
import ImageInputBtn from "./ImageInputBtn.dcEdit";
import MessageInputDraftJS from "./MessageInputDraftJS.dcEdit";
import SendButton from "./SendButton.dcEdit";
import { DraftHandleValue, EditorState, Modifier, RichUtils } from "draft-js";
import React from "react";
import SwitchReplyAsButton from "./SwitchReplyAsButton";
import { DCEditContext } from "@/app/_context/DCEditContext";

export default function BottomInputBar() {
  // Context
  const cx = useContext(DCEditContext);
  const { dispatch, state } = cx;

  // State
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [isSelfDC, setIsSelfDC] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  // Methods
  const clearImage = () => {
    setImage(undefined);
  };
  const updateImage = (imgSrc: string) => {
    setImage(imgSrc);
  };

  // Draft-JS Utils
  // https://github.com/jpuri/draftjs-utils/blob/master/js/block.js
  const removeSelectedBlocksStyle = (editorState: EditorState) => {
    const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
    if (newContentState) {
      return EditorState.push(
        editorState,
        newContentState,
        "change-block-type",
      );
    }
    return editorState;
  };
  // https://github.com/jpuri/draftjs-utils/blob/master/js/block.js
  const getResetEditorState = (editorState: EditorState) => {
    const blocks = editorState.getCurrentContent().getBlockMap().toList();
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: blocks.first().get("key"),
      anchorOffset: 0,
      focusKey: blocks.last().get("key"),
      focusOffset: blocks.last().getLength(),
    });
    const newContentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      updatedSelection,
      "forward",
    );

    const newState = EditorState.push(
      editorState,
      newContentState,
      "remove-range",
    );
    return removeSelectedBlocksStyle(newState);
  };

  // Handlers
  const handleReturn = (
    e: React.KeyboardEvent,
    editorState: EditorState,
  ): DraftHandleValue => {
    if (e.shiftKey) {
      return "not-handled";
    }
    const plainText = editorState.getCurrentContent().getPlainText();
    if (plainText.trim().length === 0 && !image) {
      return "not-handled";
    }
    dispatch({
      payload: {
        isSelfDC: isSelfDC,
        timeDisplay: "4:20 PM",
        txt: editorState.getCurrentContent().getPlainText(),
        reactions: [],
        imgSrc: image,
        // date,
        // replyTo,
      },
      type: "ADD_MESSAGE",
    });
    setImage(undefined);
    setEditorState(getResetEditorState(editorState));
    return "handled";
  };
  const handleSendBtnClick = (e: MouseEvent) => {
    const fakeEvent = new KeyboardEvent("keydown", { key: "Enter" });
    handleReturn(fakeEvent as unknown as React.KeyboardEvent, editorState);
  };

  const handlePastedFiles = (files: Blob[]): DraftHandleValue => {
    for (const file of files) {
      if (file.type.indexOf("image") !== -1) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const imgStr = event.target.result.toString();
            setImage(imgStr);
          }
        };
        reader.readAsDataURL(file);
        return "handled";
      }
    }
    return "not-handled";
  };

  // DOM
  return (
    <div className="flex flex-col">
      <div className="relative flex w-full flex-row justify-between border-t p-3 bg-overlay-faint border-default">
        {/* Hidden */}
        <input
          type="file"
          className="w-full rounded border p-2 text-sm bg-input border-default text-default hidden"
          id="dc-img-input"
          accept="image/jpeg,image/jpg,image/png"
        />
        {/* <EmojiInputBtn /> */}
        <ImageInputBtn updateImage={updateImage} />
        <div
          className={`
            w-[220pt] sm:w-[300pt] md:w-[332pt]
            flex flex-col gap-1
          `}
        >
          <div
            id="switch-reply-as-row"
            className="flex flex-row gap-1 ml-1 mb-2"
          >
            <span
              id="you-them-text"
              className="text-default font-mono"
              style={{
                width: "4ch",
              }}
            >
              {isSelfDC ? "you" : "them"}
            </span>
            <SwitchReplyAsButton onClick={() => setIsSelfDC((prev) => !prev)} />
          </div>
          <MessageInputDraftJS
            editorState={editorState}
            image={image}
            handleReturn={handleReturn}
            setEditorState={setEditorState}
            handlePastedFiles={handlePastedFiles}
            clearImage={clearImage}
          />
        </div>
        <SendButton
          onClick={handleSendBtnClick}
          disabled={
            editorState.getCurrentContent().getPlainText().trim().length ===
              0 && !image
          }
        />
      </div>
    </div>
  );
}
