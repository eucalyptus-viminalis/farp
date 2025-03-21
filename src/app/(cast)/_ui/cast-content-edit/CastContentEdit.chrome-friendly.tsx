"use client";

import "./custom.css";
import {
  ChangeEvent,
  ClipboardEventHandler,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import UploadImagesBar from "../../../../components/cast/UploadImagesBar";
import { CastEditContext } from "@/contexts/CastEditContext";
import UserList from "../../../../components/cast/username/UserList";

// Assumming root cast
export default function CastContentEdit() {
  // Props
  // Context
  const context = useContext(CastEditContext);
  const cast = context.cast;
  const lines = cast.castText.split("\n");
  // States
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
  const [showFullscreen, setShowFullScreen] = useState(false);
  const [caretOnMention, setCaretOnMention] = useState(false);
  const [userListQ, setUserListQ] = useState("");
  const [mentionWordIndex, setMentionWordIndex] = useState(-1);
  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerText = cast.castText;
    }
  }, []);
  // Handlers
  // // const handleDivClick = () => {
  // //     setShowFullScreen(true);
  // //     // if (textareaRef.current) {
  // //     //     textareaRef.current.focus();
  // //     // }
  // //     if (contentEditableRef.current) {
  // //         // contentEditableRef.current.focus();
  // //         placeCaretAtEnd(contentEditableRef.current)
  // //     }
  // };
  const placeCaretAtEnd = (el: HTMLDivElement) => {
    el.focus();
    if (
      typeof window.getSelection !== "undefined" &&
      typeof document.createRange !== "undefined"
    ) {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  // useEffect(() => {
  //     // if (textareaRef.current) {
  //     //     const length = textareaRef.current.value.length;
  //     //     textareaRef.current.setSelectionRange(length, length);
  //     // }
  //     if (contentEditableRef.current) {
  //         const length = cast.castText
  //         placeCaretAtEnd(contentEditableRef.current)
  //     }
  // }, [showFullscreen, textareaRef]);
  const checkAtSymbol = (text: string, position: number) => {
    // Extract text up to the cursor position
    const textBeforeCursor = text.slice(0, position);
    // Check for the last word before the cursor
    const lastWordMatch = textBeforeCursor.match(/(\S+)$/);

    if (lastWordMatch) {
      const lastWord = lastWordMatch[0];
      // Split the textBeforeCursor by space
      const wordsArray = textBeforeCursor.split(/\s+/);
      // Find the index of the last word in the wordsArray
      const lastWordIndex = wordsArray.length - 1;
      // Alert if the last word starts with an '@' and is not part of invalid cases
      if (
        lastWord.startsWith("@") &&
        lastWord.length > 1 &&
        !lastWord.startsWith("@@")
      ) {
        setCaretOnMention(true);
        setMentionWordIndex(lastWordIndex);
        alert(lastWordIndex);
        return lastWord;
      } else {
        setCaretOnMention(false);
      }
    }
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // e.preventDefault()
    if (textareaRef.current) {
      const index = textareaRef.current.selectionStart;
      // alert(index)
      checkAtSymbol(cast.castText, index);
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    // if (e.currentTarget.value.at(-1) === '@' && e.currentTarget.value.at()) {
    //     alert('@')
    // }
    // if (e.currentTarget.value === '@' && !cast.castText.at(cast.castText.length -1)) {
    //     alert('go')
    // }
    updateCastText(e.currentTarget.value);
    adjustTextareaHeight();
  };
  const updateCastText = (text: string) => {
    // context.dispatch({type:'SET_ROOT_CAST', payload: {...cast, castText: text}})
    context.updateCast({ ...cast, castText: text });
  };
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  };
  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const txt = e.currentTarget.innerText;
    updateCastText(txt);
  };
  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const caretIndex = range.startOffset;
      return caretIndex;
      // checkAtSymbol(txt, caretIndex)
    }
  };
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
              context.updateCast({
                ...cast,
                imageEmbeds: [
                  ...cast.imageEmbeds,
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
  return (
    <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
      {/* <div className="line-clamp-feed"> */}
      <div className="">
        <div
          className={`
                        ${!textareaFocused && "hover:cursor-pointer"}
                        min-h-32
                        relative
                        group
                        text-lg sm:text-base
                        z-0
                    `}
          // onClick={handleDivClick}
        >
          <div
            contentEditable
            // autoFocus
            ref={contentEditableRef}
            onBlur={() => setTextareaFocused(false)}
            onFocus={() => setTextareaFocused(true)}
            // onKeyDown={onKeyDownHandler}
            // onChange={onChangeHandler}
            // value={cast.castText}
            onInput={handleOnInput}
            onPaste={handlePaste}
            className={`
                            bg-transparent
                            text-transparent
                            whitespace-pre-wrap
                            caret-blue-500
                            inline-block
                            w-full
                            z-0
                            min-h-32
                            outline-none
                            ${!textareaFocused && "hover:cursor-pointer"}
                        `}
            spellCheck={false}
          ></div>
          <div
            className={`
                            ${
                              !textareaFocused &&
                              "sm:group-hover:bg-zinc-200 sm:group-hover:opacity-70 sm:dark:group-hover:bg-zinc-800"
                            }
                            absolute
                            top-0
                            text-inherit
                            w-full
                            min-h-32
                            -z-10
                            outline-none
                        `}
          >
            {lines.map((line, i) => {
              return (
                <div key={i}>
                  {line.split(" ").map((word, i) => {
                    if (/^@\w+/.test(word)) {
                      return (
                        <span key={i} className={"m"}>
                          {i !== 0 ? " " + word : word}
                          {caretOnMention && userListQ && (
                            <UserList deferredQ={userListQ} />
                          )}
                        </span>
                      );
                    } else if (/^\/\w+/.test(word)) {
                      return (
                        <span key={i} className={"m"}>
                          {i !== 0 ? " " + word : word}
                        </span>
                      );
                    } else {
                      return (
                        <span key={i} className={``}>
                          {i !== 0 ? " " + word : word}
                        </span>
                      );
                    }
                  })}

                  {i !== lines.length - 1 && <br></br>}
                </div>
              );
            })}
          </div>
          {/* {cast.castText ? (
                        <span
                            className="
                                absolute
                                hover:cursor-pointer
                                text-2xl
                            "
                        >
                            {cast.castText}
                        </span>
                    ) : (
                        <span
                            className="
                                absolute
                                text-muted
                                hover:cursor-pointer
                            "
                        >
                            Start farping...
                        </span>
                    )} */}
          {/* <textarea
                        ref={textareaRef}
                        onBlur={() => setTextareaFocused(false)}
                        onFocus={() => setTextareaFocused(true)}
                        onKeyDown={onKeyDownHandler}
                        readOnly
                        onChange={onChangeHandler}
                        value={cast.castText}
                        className={`
                            bg-inherit
                            w-full
                            min-h-32
                            resize-none
                            outline-none
                            overflow-clip
                            hidden
                            ${!textareaFocused && "hover:cursor-pointer"}
                        `}
                        spellCheck={false}
                    ></textarea> */}
          {/* Overlay */}
          {/* <div
                        id="striped-overlay"
                        className={`
                            absolute
                            hidden
                            z-10
                            ${!textareaFocused && "group-hover:block"}
                            w-full h-full
                            top-0 left-0
                            ${!textareaFocused && "striped-box"}
                            pointer-events-none
                        `}

                        // onClick={handlo}
                    ></div> */}
        </div>
        {/* Upload images */}
        <UploadImagesBar />
      </div>
    </div>
  );
}
