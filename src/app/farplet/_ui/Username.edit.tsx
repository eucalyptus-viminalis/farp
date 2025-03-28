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
import { useUsers } from "@/components/cast/username/hooks";
import { FarpletContext } from "@/contexts/FarpletContext";

// Assumming root cast
export default function Username() {
  // Context
  const cx = useContext(FarpletContext);
  const { dispatch, state } = cx;
  const username = state.user?.username;

  // States
  const [q, setQ] = useState<string>(username ?? state.usernameOverride);
  const [showUsers, setShowUsers] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);
  const deferredQ = useDeferredValue(q);
  const [mousingAround, setMousingAround] = useState(false);

  // Custom Hooks
  const users = useUsers(deferredQ);

  // State mutations
  const updateUser = () => {
    const newUser = users[selectedIndex];
    dispatch({
      type: "SET_USER",
      payload: { user: newUser },
    });
    dispatch({
      type: "OVERRIDE_PFP",
      payload: { pfpOverride: newUser.pfp_url ?? "" },
    });

    dispatch({
      type: "OVERRIDE_USERNAME",
      payload: { usernameOverride: newUser.username },
    });
  };

  // TODO: dont think we need this for farplet cx
  // const overrideUsername = (username: string) => {
  //   dispatch({
  //     type: "ove",
  //     payload: username,
  //   });
  // };

  // Handlers
  const onUserRowClick = (e: any) => {
    e.preventDefault();
    updateUser();
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
        Math.min(prevIndex + 1, users.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (
      e.key === "Enter" &&
      selectedIndex >= 0 &&
      selectedIndex < users.length
    ) {
      e.preventDefault();
      updateUser();
      setShowInput(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
    } else if (e.keyCode == 27) {
      e.preventDefault();
    }
  };
  const onSpanClick = () => {
    setShowInput(true);
    setShowUsers(true);
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

  useEffect(() => {
    setQ(username ?? "");
  }, [username]);

  const handleBlur = () => {
    setShowInput(false);
    // if (!username) {
    //   overrideUsername(DEFAULT_USERNAME);
    // }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // overrideUsername(e.currentTarget.value.trim());
    setQ(e.currentTarget.value.trim());
    setSelectedIndex(-1);
  };

  // Effects
  useEffect(() => {
    setSelectedIndex(-1);
  }, [users]);
  // Fetch users and update state when query value changes
  // Close user list when user clicks outside container
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowUsers(false);
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
  });

  return (
    <>
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
            width: (state.user?.username.length ?? 0) + 1 + "ch",
          }}
          onChange={onInputChange}
          value={q}
          type="text"
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
        />
        <ul
          onMouseLeave={handleMouseLeave}
          className="w-96 absolute z-10 rounded-lg border border-faint bg-app overflow-auto max-h-72"
        >
          {showUsers &&
            users.map((user, index) => (
              <li
                key={user.fid}
                className={`bg-app p-2 border-b-2 border-faint ${
                  selectedIndex === index ? "underline" : ""
                }`}
                onMouseEnter={(e) => onMouseEnter(e, index)}
                onClick={onUserRowClick}
              >
                <div className="flex flex-row">
                  {user.pfp_url && (
                    <div className="relative rounded-full overflow-hidden h-[64px] w-[64px]">
                      <Image
                        alt="pfp"
                        className="object-cover"
                        sizes="64px"
                        fill
                        src={user.pfp_url}
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.display_name}</span>
                    <span className="text-muted">{"@" + user.username}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </label>
      <span
        hidden={showInput}
        className={`
                    text-xs
                    text-[var(--yellow-9)]
                    sm:hover:underline
                `}
        onClick={onSpanClick}
      >
        {"@" + state.usernameOverride}
      </span>
    </>
  );
}
