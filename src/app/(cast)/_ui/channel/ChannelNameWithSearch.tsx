"use client";

import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useState,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useDeferredValue,
} from "react";
import Image from "next/image";
import { CastEditContext } from "@/app/(cast)/_context/CastEditContext";
import { useChannels } from "../username/hooks";

type UsernameProps = {
  asEmbed?: boolean;
};
const DEFAULT_USERNAME = "dwr";

// Assumming root cast
export default function ChannelNameWithSearch(props: UsernameProps) {
  // Props
  const { asEmbed } = props;

  // Context
  const context = useContext(CastEditContext);
  const cast = context.cast;
  const channelName = cast.channelName;

  // States
  const [q, setQ] = useState<string>(channelName ?? "");
  const [showChannels, setShowChannels] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);
  const deferredQ = useDeferredValue(q);
  const [mousingAround, setMousingAround] = useState(false);

  // Custom Hooks
  const channels = useChannels(deferredQ);

  // State mutations
  const updateChannel = () => {
    const newChannel = channels[selectedIndex];
    context.updateCast({
      ...cast,
      // user: newChannel,
      // pfpOverride: newChannel.pfp_url ?? "/dwr.png",
      // usernameOverride: newChannel.username,
      // displayNameOverride: newChannel.display_name ?? "Unknown",
      // activeBadgeOverride: newChannel.power_badge,
      channelName: newChannel.id,
    });
  };
  const overrideChannelName = (channel: string) => {
    context.updateCast({
      ...cast,
      channelName: channel,
    });
  };

  // Handlers
  const onChannelRowClick = (e: any) => {
    e.preventDefault();
    updateChannel();
    setShowInput(false);
    if (containerRef.current) {
      containerRef.current.hidden = true;
    }
    // setShowUsers(false);
  };
  const handleMouseLeave = () => {
    setMousingAround(false);
  };
  const onMouseEnter = (_: MouseEvent<HTMLLIElement>, i: number) => {
    setMousingAround(true);
    setSelectedIndex(i);
  };
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key)
    // console.log(e.keyCode)
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, channels.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (
      e.key === "Enter" &&
      selectedIndex >= 0 &&
      selectedIndex < channels.length
    ) {
      e.preventDefault();
      updateChannel();
      setShowInput(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
    } else if (e.keyCode == 27) {
      e.preventDefault();
    }
  };
  const onSpanClick = () => {
    setShowInput(true);
    setShowChannels(true);
  };
  // Select the input when it appears
  useEffect(() => {
    if (showInput && inputRef.current) {
      // inputRef.current.focus()
      inputRef.current.select();
    }
  }, [showInput, inputRef]);
  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleBlur = () => {
    setShowInput(false);
    if (!channelName) {
      overrideChannelName("");
    }
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    overrideChannelName(e.currentTarget.value.trim());
    setQ(e.currentTarget.value.trim());
    setSelectedIndex(-1);
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!mousingAround) {
      setShowInput(false);
      if (!cast.channelName) {
        overrideChannelName("");
        setQ("");
      }
      setShowChannels(false);
    }
  };

  // Effects
  useEffect(() => {
    setSelectedIndex(-1);
  }, [channels]);
  // Fetch users and update state when query value changes
  // Close user list when user clicks outside container
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowChannels(false);
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleBlur();
      }
    };
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        handleBlur();
      }
    };
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleBlur]);

  return (
    <div>
      <span className="mx-1 text-sm text-[#576472] dark:text-[#9FA3AF]">·</span>
      <label htmlFor="user-search-input" ref={containerRef} hidden={!showInput}>
        <input
          ref={inputRef}
          autoFocus
          name="user-search-input"
          className="
                    bg-inherit text-inherit font-mono
                    text-lg sm:text-base
                "
          style={{
            minWidth: "8ch",
            width: cast.channelName
              ? cast.channelName.length + 1 + "ch"
              : undefined,
          }}
          onChange={onInputChange}
          value={cast.channelName}
          // onBlur={onBlur}
          // onBlurCapture={()=>console.log('onblur captured')}
          type="text"
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
        />
        <ul
          onMouseLeave={handleMouseLeave}
          className="w-96 absolute z-10 rounded-lg border border-faint bg-app overflow-auto max-h-72"
        >
          {showChannels &&
            channels.map((channel, index) => (
              <li
                key={index}
                className={`bg-app p-2 border-b-2 border-faint ${
                  selectedIndex === index ? "underline" : ""
                }`}
                onMouseEnter={(e) => onMouseEnter(e, index)}
                onClick={onChannelRowClick}
              >
                <div className="flex flex-row">
                  {channel.image_url && (
                    <div className="relative rounded-full overflow-hidden h-[64px] w-[64px]">
                      <Image
                        alt="pfp"
                        className="object-cover"
                        sizes="64px"
                        fill
                        src={channel.image_url}
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{channel.id}</span>
                    <span className="text-muted">
                      {channel.follower_count + " followers"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </label>
      <span
        // className="cursor-pointer overflow-hidden text-ellipsis text-sm
        // text-[#576472] dark:text-[#9FA3AF]
        // hover:underline
        // "
        className="cursor-pointer overflow-hidden text-ellipsis text-sm
                            text-[var(--yellow-9)] dark:text-[var(--yellow-9)]
                hover:underline
                "
        title={"Override channel name"}
        onClick={onSpanClick}
        hidden={showInput}
      >
        {`/${cast.channelName}`}
      </span>
      {/* <span
                hidden={showInput}
                className="relative h-min w-auto"
                data-state="closed"
            >
                <div
                    title="Override username"
                    className={`relative text-muted hover:underline ${
                        asEmbed ? "text-sm" : ""
                    }`}
                    onClick={onSpanClick}
                >
                    {"@" + channelName}
                </div>
            </span> */}
    </div>
  );
}
