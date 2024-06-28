"use client";

import "./custom.css";
import {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import UploadImagesBar from "../cast/UploadImagesBar";
import { CastEditContext } from "@/contexts/CastEditContext";
import UserList from "../cast/username/UserList";

// Assumming root cast
export default function CastContentEdit() {
    // Props
    // Context
    const context = useContext(CastEditContext);
    const cast = context.cast;
    const lines = cast.castText.split('\n')
    // States
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const [textareaFocused, setTextareaFocused] = useState<boolean>(false);
    const [showFullscreen, setShowFullScreen] = useState(false);
    const [caretOnMention, setCaretOnMention] = useState(false)
    const [userListQ, setUserListQ] = useState('')
    const [mentionWordIndex, setMentionWordIndex] = useState(-1)
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
        if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
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
    // FIXME: buggy
    // The regex is poor
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
                setCaretOnMention(true)
                setMentionWordIndex(lastWordIndex)
                alert(lastWordIndex)
                return lastWord
            } else {
                setCaretOnMention(false)
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
    // const handleOnInput = (e:FormEvent<HTMLDivElement>) => {
    //     e.preventDefault()
    //     const txt = e.currentTarget.innerText
    //     setTxt(txt)
    //     console.log('innertext\n' + JSON.stringify(txt))
    //     console.log()
    // }
    const handleOnInput =(e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const txt = e.currentTarget.innerText
        updateCastText(txt);
    }
    const getCaretPosition = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const caretIndex = range.startOffset;
            return caretIndex
            // checkAtSymbol(txt, caretIndex)
        }
    };
    const onKeyUp = () => {
        // Take care of showing userlist
        const caretIndex = getCaretPosition()
        if (caretIndex !== undefined) {
            // Check caret is on an @ word
            const mention = checkAtSymbol(cast.castText, caretIndex)
            if (mention && mention.startsWith('@')) {
                setUserListQ(mention.slice(1))
            }
        }
        // handleCaretPosition();
    };
    const onKeyDown = () => {
        // Take care of naving userlist
        // handleCaretPosition();
    };
    const updateCastTextAtIndex = (index: number) => {
        const castTxt = cast.castText

    }
    return (
        <div className="flex flex-col whitespace-pre-wrap break-words pb-2 text-base leading-5 tracking-normal">
            <div className="line-clamp-feed">
                <div
                    className={`
                        ${!textareaFocused && "hover:cursor-pointer"}
                        min-h-32
                        relative
                        group
                        z-0
                    `}
                    // onClick={handleDivClick}
                >
                    <div
                        contentEditable
                        // autoFocus
                        ref={contentEditableRef}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onBlur={() => setTextareaFocused(false)}
                        onFocus={() => setTextareaFocused(true)}
                        // onKeyDown={onKeyDownHandler}
                        // onChange={onChangeHandler}
                        // value={cast.castText}
                        onInput={handleOnInput}
                        className={`
                            bg-transparent
                            text-transparent
                            w-full
                            z-0
                            min-h-32
                            outline-none
                            overflow-clip
                            ${!textareaFocused && "hover:cursor-pointer"}
                        `}
                        spellCheck={false}
                    ></div>
                    <div
                        className={`
                            absolute 
                            -translate-y-full 
                            ${!textareaFocused && "group-hover:bg-zinc-800 group-hover:opacity-70"}
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
                                    {line.split(' ').map((word, i) => {
                                        if (word.startsWith('@') && word.trim().length > 1 && !word.startsWith('@@')) {
                                            return (
                                                <span key={i} className={'m'}>
                                                    {i!== 0 ? ' ' + word : word}
                                                    {caretOnMention && userListQ && (
                                                        <UserList deferredQ={userListQ}/>
                                                    )}
                                                </span>
                                            )
                                        } else {
                                            return (
                                            <span key={i} className={``}>
                                                {i!== 0 ? ' ' + word : word}
                                            </span>
                                            )
                                        }
                                        // return (
                                        //     <span key={i} className={`${word.startsWith('@') && word.trim().length > 1 && !word.startsWith('@@') && 'm'}`}>
                                        //         {i!== 0 ? ' ' + word : word}
                                        //     </span>
                                        // )
                                    })}

                                {i !== lines.length -1 && (
                                    <br></br>
                                )}
                                </div>
                            )
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
                    <div
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
                    ></div>
                </div>
                {/* Upload images */}
                <UploadImagesBar />
            </div>
        </div>
    );
}
