"use client";
import { useContext, useState } from "react";
import { EditContext } from "@/contexts/EditContext";
import { CastEditProvider } from "@/contexts/CastEditContext";
import ActionButton from "../../components/button/ActionButton";
import PreviewNode from "../preview/PreviewNode";
import CastEdit from "@/components/cast/CastEdit.castEditContext";

type EditMode = "edit" | "preview";

export default function EditPage() {
    // States
    const [mode, setMode] = useState<EditMode>("edit");
    const context = useContext(EditContext);
    const rootCast = context.state.rootCast;
    // Handlers
    const handleOnClick = (mode: EditMode) => {
        setMode(mode);
    };

    return (
        <div className="container mx-auto min-h-full h-max">
            <div className="flex min-h-screen flex-row justify-center">
                <main
                    className="h-full bg-app relative w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
                >
                    {/* Bleed */}
                    <div 
                        className="
                            absolute top-0 -translate-x-full h-full left-0 w-full 
                            z-10 
                            bg-gradient-to-l 
                            from-app-tw-light dark:from-app-tw-dark 
                            from-20%
                            to-red-500 dark:to-red-600
                        "
                    >
                    </div>
                    <div 
                        className="
                            absolute top-0 translate-x-full h-full right-0 w-full 
                            z-10 
                            bg-gradient-to-r from-app-tw-light dark:from-app-tw-dark 
                            from-20%
                            to-blue-500 dark:to-blue-600
                        "
                    >
                    </div>
                    <div className="w-full h-full">
                        <div className="h-full min-h-screen border-default sm:border-x">
                            {/* Mode buttons */}
                            <div
                                className="
                                        flex
                                        justify-center
                                        p-2
                                    "
                            >
                                <ActionButton
                                    handleOnClick={() => handleOnClick("edit")}
                                    withBg={mode === "edit"}
                                >
                                    Edit
                                </ActionButton>
                                <ActionButton
                                    handleOnClick={() =>
                                        handleOnClick("preview")
                                    }
                                    withBg={mode === "preview"}
                                >
                                    Preview
                                </ActionButton>
                            </div>
                            {mode === "edit" && (
                                <div>
                                    <CastEditProvider
                                        cast={rootCast}
                                        castType="root-cast"
                                        dispatch={context.dispatch}
                                    >
                                        <CastEdit />
                                    </CastEditProvider>
                                    {rootCast.replies?.map((reply, i) => {
                                        return (
                                        <CastEditProvider
                                            cast={reply}
                                            key={`reply-cast-edit-${i}`}
                                            replyIndex={i}
                                            lastIndex={rootCast.replies ? rootCast.replies.length -1 === i : true}
                                            castType="reply"
                                            dispatch={context.dispatch}
                                        >
                                            <CastEdit />
                                        </CastEditProvider>
                                        )
                                    })}
                                </div>
                            )}
                            {mode === "preview" && (
                                <PreviewNode rootCast={rootCast} />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
