"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { EditContext } from "@/contexts/EditContext";
import { CastEditProvider } from "@/contexts/CastEditContext";
import CastEdit from "@/components/cast/CastEdit.castEditContext";
import ActionButton from "@/components/button/ActionButton";
import PreviewNode from "../components/PreviewNode";

type EditMode = "edit" | "preview";

const POPULAR_FARPS: {
    displayName: string;
    pfp: string;
    username: string;
}[] = [
    {
        displayName: "Dan Romero",
        pfp: "/dwr.png",
        username: "dwr",
    },
    {
        displayName: "Donald J. Trump",
        pfp: "/trump.jpg",
        username: "realDonaldTrump",
    },
    {
        displayName: "President Biden",
        pfp: "/biden.jpg",
        username: "POTUS",
    },
    {
        displayName: "Vitalik Buterin",
        pfp: "/vitalik.jpg",
        username: "vitalik.eth",
    },
    {
        displayName: "ansem",
        pfp: "/ansem.jpg",
        username: "ansem",
    },
    {
        displayName: "solana",
        pfp: "/solana.jpg",
        username: "solana",
    },
];

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
                <main className="h-full bg-app relative w-full shrink-0 justify-center sm:mr-4 sm:w-[540px] lg:w-[620px]">
                    {/* Bleed */}
                    <div
                        className="
                            absolute top-0 -translate-x-full h-full left-0 w-full 
                            z-10 
                            bg-gradient-to-l 
                            from-app-tw-light dark:from-app-tw-dark 
                            from-20%
                            to-[var(--yellow-6)] dark:to-[var(--yellow-6)]
                        "
                    ></div>
                    <div
                        className="
                            absolute top-0 translate-x-full h-full right-0 w-full 
                            z-10 
                            bg-gradient-to-r from-app-tw-light dark:from-app-tw-dark 
                            from-20%
                            to-[var(--yellow-6)] dark:to-[var(--yellow-6)]
                        "
                    ></div>
                    <div className="w-full h-full">
                        <div className="h-full min-h-screen border-default sm:border-x">
                            {/* Mode buttons */}
                            <div
                                className="
                                        flex
                                        justify-center
                                        gap-1
                                        p-1
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
                                <div className="">
                                    <div className="flex flex-col justify-center items-center p-2">
                                        <div className="flex flex-wrap gap-2">
                                            {POPULAR_FARPS.map((farper, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`
                                                        relative flex flex-col items-center justify-center sm:hover:cursor-pointer
                                                        ${
                                                            rootCast.usernameOverride ==
                                                            farper.username
                                                                ? "border-[var(--yellow-9)] border-2"
                                                                : "border-gray-500 border-2"
                                                        }
                                                        rounded-full
                                                    `}
                                                    onClick={()=>{
                                                        context.dispatch({type:'SET_ROOT_CAST', payload: {
                                                            ...rootCast,
                                                            displayNameOverride: farper.displayName,
                                                            pfpOverride: farper.pfp,
                                                            usernameOverride: farper.username
                                                        }})
                                                    }}
                                                        style={{
                                                            width: "70px", // Adjust size to accommodate outer border
                                                            height: "70px", // Adjust size to accommodate outer border
                                                            // padding: "10px", // Adjust padding to achieve the outer border effect
                                                        }}
                                                    >
                                                        <Image
                                                            src={farper.pfp}
                                                            className={`
                                                            aspect-square shrink-0 rounded-full 
                                                            border
                                                            object-cover bg-app border-default
                                                        `}
                                                            alt={
                                                                farper.username +
                                                                " avatar"
                                                            }
                                                            width={64}
                                                            height={64}
                                                            style={{
                                                                minWidth: `${64}px`,
                                                                minHeight: `${64}px`,
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
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
                                                lastIndex={
                                                    rootCast.replies
                                                        ? rootCast.replies
                                                              .length -
                                                              1 ===
                                                          i
                                                        : true
                                                }
                                                castType="reply"
                                                dispatch={context.dispatch}
                                            >
                                                <CastEdit />
                                            </CastEditProvider>
                                        );
                                    })}
                                </div>
                            )}
                            {mode === "preview" && <PreviewNode />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
