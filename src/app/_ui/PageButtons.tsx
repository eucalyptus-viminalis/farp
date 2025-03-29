"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { GlobalContext, Page } from "../_context/GlobalContext";
import ActionButton from "./ActionButton";

export default function PageButtons() {
  const pathname = usePathname();

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
          withBg={pathname === "/dc"}
        >
          DC
        </ActionButton>
      </Link>
      <Link href={"/farplet"}>
        <ActionButton
          handleOnClick={() => handleOnClick("farplet")}
          withBg={pathname === "/farplet"}
        >
          Farplet
        </ActionButton>
      </Link>
    </div>
  );
}
