"use client";
import { GlobalContext } from "@/app/_context/GlobalContext";
import * as Switch from "@radix-ui/react-switch";
import { useContext } from "react";

export default function PowerbadgeToggle() {
  // Context
  const cx = useContext(GlobalContext);
  // Handlers
  const handleOnChange = () => {
    cx.setShowPowerbadge((prev) => !prev);
  };
  return (
    <div className="flex items-center">
      <label className="leading-none pr-[15px]" htmlFor="airplane-mode">
        Powerbadge
      </label>
      <Switch.Root
        className={`
                        w-[42px] h-[25px]
                        rounded-full
                        relative
                        focus:shadow-[0_0_0_2px] focus:shadow-black
                        data-[state=checked]:bg-green-800
                        data-[state=unchecked]:bg-zinc-800
                        outline-none
                        cursor-default
                    `}
        id="powerbadge-mode"
        checked={cx.showPowerbadge}
        onCheckedChange={handleOnChange}
        // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
        style={{
          WebkitTapHighlightColor: "red",
        }}
      >
        <Switch.Thumb
          className={`
                            block
                            w-[21px] h-[21px]
                            bg-[var(--yellow-9)]
                            rounded-full
                            transition-transform
                            duration-100
                            translate-x-0.5
                            will-change-transform
                            data-[state=checked]:translate-x-[19px]
                        `}
        />
      </Switch.Root>
    </div>
  );
}
