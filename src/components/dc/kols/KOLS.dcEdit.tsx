"use client";
import Image from "next/image";
import { useContext } from "react";
import { DCEditContext } from "@/contexts/DCEditContext";

const POPULAR_KOLS: {
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
        displayName: "Ran Domero",
        pfp: "/ran.avif",
        username: "randomeror",
    },
    {
        displayName: "Dana Pumelo",
        pfp: "/dana.avif",
        username: "dwp",
    },
    {
        displayName: "Polymarket",
        pfp: "/polymarket.avif",
        username: "polymarket",
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
export default function KOLS() {
    const cx = useContext(DCEditContext);
    const {dispatch,state} = cx
    return (
        <div className="flex flex-col justify-center items-center p-2">
            <div className="flex flex-wrap gap-2">
                {POPULAR_KOLS.map((kol, i) => {
                    return (
                        <div
                            key={i}
                            className={`
                                relative flex flex-col items-center justify-center sm:hover:cursor-pointer
                                ${
                                    state.usernameOverride ==
                                    kol.username
                                        ? "border-[var(--yellow-9)] border-2"
                                        : "border-gray-500 border-2"
                                }
                                rounded-full
                            `}
                            onClick={() => {
                                dispatch({
                                    payload: {
                                        activeBadge: true,
                                        displayName: kol.displayName,
                                        pfp: kol.pfp,
                                        username: kol.username,
                                    },
                                    type: 'OVERRIDE_MULTI',
                                })
                            }}
                            style={{
                                width: "46px", // Adjust size to accommodate outer border
                                height: "46px", // Adjust size to accommodate outer border
                                // padding: "10px", // Adjust padding to achieve the outer border effect
                            }}
                        >
                            <Image
                                src={kol.pfp}
                                className={`
                                    aspect-square shrink-0 rounded-full 
                                    border
                                    object-cover bg-app border-default
                                `}
                                alt={kol.username + " avatar"}
                                width={44}
                                height={44}
                                style={{
                                    minWidth: `${44}px`,
                                    minHeight: `${44}px`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
