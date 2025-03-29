"use client";
import { DCEditContext } from "@/app/_context/DCEditContext";
import { appConfig } from "@/app/appConfig";
import Image from "next/image";
import { useContext } from "react";

export default function KOLSection() {
  const cx = useContext(DCEditContext);
  const { dispatch, state } = cx;
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="flex flex-wrap gap-2">
        {appConfig.kols.map((kol, i) => {
          return (
            <div
              key={i}
              className={`
                                relative flex flex-col items-center justify-center sm:hover:cursor-pointer
                                ${
                                  state.usernameOverride == kol.username
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
                  type: "OVERRIDE_MULTI",
                });
              }}
              style={{
                width: "46px", // Adjust size to accommodate outer border
                height: "46px", // Adjust size to accommodate outer border
                // padding: "10px", // Adjust padding to achieve the outer border effect
              }}
            >
              <Image
                src={kol.pfp}
                key={i}
                unoptimized
                title={kol.username}
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
