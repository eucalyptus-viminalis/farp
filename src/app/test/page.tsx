"use client";

import { FormEvent, useRef, useState } from "react";

export default function TestPage() {
    const [txt, setTxt] = useState("");
    const lines = txt.split("\n");
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const checkAtSymbol = (text: string, position: number) => {
        // Extract text up to the cursor position
        const textBeforeCursor = text.slice(0, position);
        // Check for the last word before the cursor
        const lastWordMatch = textBeforeCursor.match(/(\S+)$/);

        if (lastWordMatch) {
            const lastWord = lastWordMatch[0];
            // Split the textBeforeCursor by space
            const wordsArray = textBeforeCursor.split(" ");
            // Find the index of the last word in the wordsArray
            const lastWordIndex = wordsArray.length - 1;
            // Alert if the last word starts with an '@' and is not part of invalid cases
            if (
                lastWord.startsWith("@") &&
                lastWord.length > 1 &&
                !lastWord.startsWith("@@")
            ) {
                alert("Cursor is on a word that starts with @");
            }
        }
    };
    const onKeyUp = () => {
        // Take care of showing userlist
        console.log('onKeyUp')
        handleCaretPosition();
    };
    const onKeyDown = () => {
        // Take care of naving userlist
        console.log('onKeyDown')
        handleCaretPosition();
    };
    const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        const txt = e.currentTarget.innerText;
        setTxt(txt);
        console.log("innertext\n" + JSON.stringify(txt));
    };
    const handleOnClick = () => {
        if (contentEditableRef.current) {
            // contentEditableRef.current.click()
        }
    };
    const handleCaretPosition = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const caretIndex = range.startOffset;
            console.log(caretIndex);
            checkAtSymbol(txt, caretIndex)
        }
    };
    // const adjustTextareaHeight = () => {
    //     if (contentEditableRef.current) {
    //         contentEditableRef.current.style.height = "auto"; // Reset height
    //         contentEditableRef.current.style.height = `${contentEditableRef.current.scrollHeight}px`; // Set to scroll height
    //     }
    // };
    return (
        <div className="flex flex-col gap-10 min-h-screen justify-center items-center">
            <div className="relative z-0">
                <div
                    ref={contentEditableRef}
                    contentEditable
                    onInput={handleOnInput}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    className="text-2xl text-transparent z-0 bg-transparent w-52 border border-solid min-w-36"
                    spellCheck={false}
                ></div>
                <div className="absolute -translate-y-full -z-10 w-52 text-2xl text-white border border-solid min-w-36">
                    {lines.map((line, i) => {
                        return (
                            <div key={i}>
                                {line.split(" ").map((word, i) => {
                                    if (
                                        word.startsWith("@") &&
                                        word.trim().length > 1 &&
                                        !word.startsWith("@@")
                                    ) {
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
            </div>
            <p>static text</p>
        </div>
    );
}
// <span className={`${word.startsWith('@') && word.trim().length > 1 && !word.startsWith('@@') && 'text-violet-600'}`}>
//     {' ' + word}
// </span>
