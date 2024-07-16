"use client";
import ActionButton from "@/components/button/ActionButton";
import { GlobalContext, Page } from "@/contexts/GlobalContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function PageButtons() {
    const pathname = usePathname()

    // Context
    const cx = useContext(GlobalContext);
    const { setPage } = cx;

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
            <Link href={"/"}>
                <ActionButton
                    handleOnClick={() => handleOnClick("cast")}
                    withBg={pathname === "/"}
                >
                    Cast
                </ActionButton>
            </Link>
            <Link href={"/dc"}>
                <ActionButton
                    handleOnClick={() => handleOnClick("dc")}
                    withBg={pathname=== "/dc"}
                >
                    DC
                </ActionButton>
            </Link>
        </div>
    );
}
