"use client";
import ActionButton from "@/components/button/ActionButton";
import { useContext } from "react";
import { GlobalContext, Mode } from "../_context/GlobalContext";

export default function ModeButtons() {
  // Context
  const cx = useContext(GlobalContext);
  const { mode, setMode } = cx;

  // Handlers
  const handleOnClick = (mode: Mode) => {
    setMode(mode);
  };

  // DOM
  return (
    <div
      className="
                flex justify-center gap-1
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
        handleOnClick={() => handleOnClick("preview")}
        withBg={mode === "preview"}
      >
        Preview
      </ActionButton>
    </div>
  );
}
