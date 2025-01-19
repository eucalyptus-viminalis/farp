"use client";
import Image from "next/image";
import { EditContext } from "@/contexts/EditContext";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

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
    pfp: "/vitalik.avif",
    username: "vitalik.eth",
  },
  {
    displayName: "thread🎩",
    pfp: "/threadguy.jpg",
    username: "threadguy",
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
  const cx = useContext(GlobalContext);
  const { mode } = cx;
  const context = useContext(EditContext);
  const rootCast = context.state.rootCast;
  return (
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
              onClick={() => {
                context.dispatch({
                  type: "SET_ROOT_CAST",
                  payload: {
                    ...rootCast,
                    displayNameOverride: farper.displayName,
                    pfpOverride: farper.pfp,
                    usernameOverride: farper.username,
                  },
                });
              }}
              style={{
                width: "46px", // Adjust size to accommodate outer border
                height: "46px", // Adjust size to accommodate outer border
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
                alt={farper.username + " avatar"}
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
