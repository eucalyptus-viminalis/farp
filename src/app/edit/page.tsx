"use client";
import { useContext, useState } from "react";
import CastEdit from "../../components/cast/CastEdit";
import { EditContext } from "./context";
import ActionButton from "../../components/button/ActionButton";
import PreviewNode from "../preview/PreviewNode";

type EditMode = "edit" | "preview";

export default function EditPage() {
    // States
    const [mode, setMode] = useState<EditMode>("edit");
    const context = useContext(EditContext);
    const cast = context.state.rootCast;
    // Handlers
    const handleOnClick = (mode: EditMode) => {
        setMode(mode);
    };

    return (
        <div className="container mx-auto min-h-full h-full">
            <div className="flex min-h-screen flex-row justify-center">
                <main
                    className="h-full w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]"
                    style={
                        {
                            // colorScheme: 'light',
                        }
                    }
                >
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
                            {mode === "edit" && <CastEdit />}
                            {mode === "preview" && (
                                <PreviewNode rootCast={cast}/>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
