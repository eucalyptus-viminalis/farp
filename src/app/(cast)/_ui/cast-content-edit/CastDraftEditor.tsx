"use client";

import UploadImagesBar from "@/components/cast/UploadImagesBar";
import { CastEditContext } from "@/contexts/CastEditContext";
import {
  Editor,
  EditorState,
  DraftHandleValue,
  ContentState,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { FormEvent, useContext, useEffect, useState } from "react";

type Props = {};

export default function CastDraftEditor(props: Props) {
  const cx = useContext(CastEditContext);
  const castText = cx.cast.castText;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const {} = props;
  useEffect(() => {
    const currentText = editorState.getCurrentContent().getPlainText();
    if (castText !== currentText) {
      const content = ContentState.createFromText(castText);
      const newEditorState = EditorState.createWithContent(content);
      setEditorState(newEditorState);
    }
  }, [castText, editorState]);

  // State mutations
  const updateCastText = (text: string) => {
    cx.updateCast({ ...cx.cast, castText: text });
  };

  // Input handlers
  // const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const txt = e.currentTarget.innerText;
  //   updateCastText(txt);
  // };
  const handlePaste = (event: ClipboardEvent) => {
    const clipboardItems = event.clipboardData?.items;
    if (!clipboardItems) return;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.indexOf("image") !== -1) {
        event.preventDefault();
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            // console.log(event.target?.result); // This is the base64 encoded image data
            if (event.target && event.target.result) {
              cx.updateCast({
                ...cx.cast,
                imageEmbeds: [
                  ...cx.cast.imageEmbeds,
                  event.target.result.toString(),
                ].slice(-2),
              });
            }
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const handleReturn = (
    e: React.KeyboardEvent,
    editorState: EditorState,
  ): DraftHandleValue => {
    // return should just add new lines
    if (e.shiftKey) {
      return "not-handled";
    }
    const plainText = editorState.getCurrentContent().getPlainText();
    if (plainText.trim().length === 0) {
      return "not-handled";
    }
    return "handled";
  };

  const handlePastedFiles = (files: Blob[]): DraftHandleValue => {
    for (const file of files) {
      if (file.type.indexOf("image") !== -1) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const imgStr = event.target.result.toString();
            // TODO: Do something with imgStr
            // setImage(imgStr);
            cx.updateCast({
              ...cx.cast,
              imageEmbeds: [...cx.cast.imageEmbeds, imgStr].slice(-2),
            });
          }
        };
        reader.readAsDataURL(file);
        return "handled";
      }
    }
    return "not-handled";
  };
  const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
  const customKeyBindingFn = (e: React.KeyboardEvent): string | null => {
    if (e.key === "Backspace") {
      alert("bkspc");
      console.log("hjkhk");
      return "custom-backspace";
    }
    return null;
  };
  const handleBeforeInput = (
    chars: string,
    editorState: EditorState,
  ): DraftHandleValue => {
    // This does NOT get called for backspace, but we include it to handle other inputs if needed
    return "not-handled";
  };
  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
  ): DraftHandleValue => {
    if (command === "custom-backspace") {
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        alert("lol");
        const contentState = editorState.getCurrentContent();
        const newContentState = Modifier.removeRange(
          contentState,
          selection,
          "backward",
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range",
        );
        setEditorState(newEditorState);
        return "handled";
      }
    }

    return "not-handled";
  };

  return (
    <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
      <div
        // other tailwind options
        // className={`
        //     w-[332pt]
        //     text-sm
        // `}
        onBlur={() => setTextareaFocused(false)}
        onFocus={() => setTextareaFocused(true)}
        className={`
          z-10
        group
        hover:group
        ${!textareaFocused && "hover:cursor-pointer"}
        ${
          !textareaFocused &&
          "sm:group-hover:bg-zinc-200 sm:group-hover:opacity-70 sm:dark:group-hover:bg-zinc-800"
        }
        ${
          !textareaFocused &&
          "sm:hover:bg-zinc-200 sm:hover:opacity-70 sm:dark:hover:bg-zinc-800"
        }
        scrollbar-vert
        relative
        max-h-56
        overflow-hidden overflow-y-auto break-words
        rounded
        text-base
        bg-input
        text-default
        z-20
      `}
      >
        <Editor
          editorState={editorState}
          // onChange={setEditorState}
          // onChange={(newState) => {
          //   const previousContent = editorState.getCurrentContent();
          //   const previousText = previousContent.getPlainText();
          //   const newText = newState.getCurrentContent().getPlainText();

          //   const selection = editorState.getSelection();

          //   // Mobile backspace fix: If the selection was non-collapsed and new text is shorter
          //   if (
          //     !selection.isCollapsed() &&
          //     newText.length < previousText.length
          //   ) {
          //     console.log("Detected backspace deletion on mobile");

          //     const newContentState = Modifier.removeRange(
          //       previousContent,
          //       selection,
          //       "backward",
          //     );
          //     const forcedState = EditorState.push(
          //       editorState,
          //       newContentState,
          //       "remove-range",
          //     );
          //     setEditorState(forcedState);
          //     return;
          //   }

          //   setEditorState(newState);

          //   // Optional: Sync text to context
          //   const plainText = newState.getCurrentContent().getPlainText();
          //   updateCastText(plainText);
          // }}
          onChange={(newState) => {
            setEditorState(newState);
            const content = newState.getCurrentContent();
            const plainText = content.getPlainText();
            updateCastText(plainText);
          }}
          // keyBindingFn={customKeyBindingFn}
          // handleKeyCommand={handleKeyCommand}
          // handleReturn={handleReturn}
          handlePastedFiles={handlePastedFiles}
          // placeholder="Type your message..."
          spellCheck={true}
        />
      </div>
      <UploadImagesBar />
    </div>
  );
}
