"use client";
import Image from "next/image";
import { useContext } from "react";
import { EditContext } from "../../_context/EditContext";
import { appConfig } from "@/app/appConfig";

export default function KOLSection() {
  const editCx = useContext(EditContext);
  const rootCast = editCx.state.rootCast;
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="flex flex-wrap gap-2">
        {appConfig.kols.map((farper, i) => {
          return (
            <div
              key={i}
              className={`
              relative flex flex-col items-center justify-center sm:hover:cursor-pointer
              ${
                rootCast.usernameOverride == farper.username
                  ? "border-[var(--yellow-9)] border-2"
                  : "border-gray-500 border-2"
              }
              rounded-full
              `}
              // TODO: Change state.user?
              onClick={() => {
                editCx.dispatch({
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
