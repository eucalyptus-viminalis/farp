"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CastEditContext } from "@/app/(cast)/_context/CastEditContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  EditorState,
} from "lexical";
import UploadImagesBar from "../UploadImagesBar";

type Props = {};

function EditorInner({
  onChange,
  handlePaste,
}: {
  onChange: (editorState: EditorState) => void;
  handlePaste: (event: React.ClipboardEvent) => void;
}) {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && contentEditableRef.current) {
        contentEditableRef.current.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [textareaFocused, setTextareaFocused] = useState(false);
  return (
    <div
      onPaste={handlePaste}
      onBlur={() => setTextareaFocused(false)}
      onFocus={() => setTextareaFocused(true)}
      className={`
        group relative overflow-y-auto rounded text-base bg-input text-default
      `}
    >
      <PlainTextPlugin
        contentEditable={
          <ContentEditable
            ref={contentEditableRef}
            className={`outline-none min-h-20 max-h-64
              text-lg
          ${!textareaFocused && "hover:cursor-pointer"}
          ${
            !textareaFocused &&
            "sm:group-hover:bg-zinc-200 sm:group-hover:opacity-70 sm:dark:group-hover:bg-zinc-800"
          }
          ${
            !textareaFocused &&
            "sm:hover:bg-zinc-200 sm:hover:opacity-70 sm:dark:hover:bg-zinc-800"
          }
          `}
          />
        }
        // placeholder={<div className="text-zinc-400">Type your message...</div>}
        placeholder={
          <div
            className="absolute top-0 left-0 text-gray-500"
            hidden={textareaFocused}
          >
            Type your message...
          </div>
        }
        ErrorBoundary={() => <div>Error</div>}
      />
      <OnChangePlugin onChange={onChange} />
    </div>
  );
}

export default function CastEditLexical(props: Props) {
  const cx = useContext(CastEditContext);
  const castText = cx.cast.castText;

  const initialConfig = {
    namespace: "CastEditLexical",
    theme: {},
    nodes: [],
    onError(error: Error) {
      console.error(error);
    },
    editorState(editor: any) {
      editor.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        const textNode = $createTextNode(castText);
        paragraph.append(textNode);
        root.append(paragraph);
      });
    },
  };
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      let text = "";
      for (const child of root.getChildren()) {
        text += child.getTextContent() + "\n";
      }
      cx.updateCast({ ...cx.cast, castText: text.trimEnd() });
    });
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        event.preventDefault();
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result?.toString();
            if (base64) {
              cx.updateCast({
                ...cx.cast,
                imageEmbeds: [...cx.cast.imageEmbeds, base64].slice(-2),
              });
            }
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  return (
    <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorInner onChange={onChange} handlePaste={handlePaste} />
      </LexicalComposer>
      <UploadImagesBar />
    </div>
  );
}
