'use client'

import { DCEditContext } from "@/contexts/DCEditContext";
import { useContext } from "react";

export default function MessageInput() {
    const cx = useContext(DCEditContext)

    return (
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
    );
}
