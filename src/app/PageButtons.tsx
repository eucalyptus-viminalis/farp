"use client";
import ActionButton from "@/components/button/ActionButton";
import { GlobalContext, Page } from "@/contexts/GlobalContext";
import { useContext } from "react";

export default function PageButtons() {
    // Context
    const cx = useContext(GlobalContext);
    const { page, setPage } = cx;

    // Handlers
    const handleOnClick = (page: Page) => {
        setPage(page);
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
                handleOnClick={() => handleOnClick("cast")}
                withBg={page === "cast"}
            >
                Cast
            </ActionButton>
            <ActionButton
                handleOnClick={() => handleOnClick("dc")}
                withBg={page === "dc"}
            >
                DC
            </ActionButton>
        </div>
    );
}
