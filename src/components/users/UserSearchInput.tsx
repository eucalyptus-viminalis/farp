"use client";

import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useState,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { searchUser } from "../../app/serverAction";
import { EditContext } from "@/app/_context/EditContext";

type UserSearchInputProps = {
  toggleView: Function;
  hidden: boolean;
};
export default function UserSearchInput(props: UserSearchInputProps) {
  const { toggleView, hidden } = props;
  // Context
  const context = useContext(EditContext);
  const cast = context.state.rootCast;
  // States
  const [users, setUsers] = useState<SearchedUser[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  // const [selectedUser, setSelectedUser] = useState<SearchedUser | null>(null);
  const [q, setQ] = useState<string>("");
  const [showUsers, setShowUsers] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLLabelElement>(null);

  // Handlers
  const handleFocus = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  const onMouseEnter = (e: MouseEvent<HTMLLIElement>, i: number) => {
    setSelectedIndex(i);
  };
  const updateUser = () => {
    const newUser = users[selectedIndex];
    // setSelectedUser(newUser);
    context.dispatch({
      type: "SET_ROOT_CAST",
      payload: {
        ...cast,
        user: newUser,
        pfpOverride: newUser.pfp_url ?? "/dwr.png",
        usernameOverride: newUser.username,
        displayNameOverride: newUser.display_name ?? "Unknown",
        activeBadgeOverride: newUser.power_badge,
      },
    });
  };
  const overrideUsername = (username: string) => {
    context.dispatch({
      type: "SET_ROOT_CAST",
      payload: { ...cast, usernameOverride: username },
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowUsers(true);
    overrideUsername(e.currentTarget.value);
    setQ(e.currentTarget.value);
  };
  const onClickHandler = (e: any) => {
    e.preventDefault();
    updateUser();
    setShowUsers(false);
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
    }
  };
  const DEFAULT_USERNAME = "dwr";
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    setInputFocused(false);
    if (!cast.usernameOverride) {
      overrideUsername(DEFAULT_USERNAME);
    }
    toggleView();
  };
  // Fetch users and update state when query value changes
  useEffect(() => {
    if (q.length > 0) {
      // to prevent searching with an empty string
      const fetchData = async () => {
        try {
          const result = await searchUser(q);
          setUsers(result);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setUsers([]);
      setSelectedIndex(-1);
    }
  }, [q]);
  // Close user list when user clicks outside container
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowUsers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <label htmlFor="user-search-input" ref={containerRef}>
      <input
        ref={inputRef}
        hidden={hidden}
        autoFocus
        name="user-search-input"
        className="
                    bg-inherit text-inherit font-mono
                "
        style={{
          minWidth: "8ch",
          width: cast.usernameOverride.length + 1 + "ch",
        }}
        onChange={onChangeHandler}
        value={cast.usernameOverride}
        type="text"
        onKeyDown={onKeyDownHandler}
        onBlur={onBlur}
        onFocus={() => setShowUsers(true)}
        // onBlur={e=>}
      />
      <ul className="w-96 absolute z-10 bg-white">
        {showUsers &&
          users.map((user, index) => (
            <li
              key={user.fid}
              className={`bg-app p-2 border-b-2 border-faint ${
                selectedIndex === index ? "underline" : ""
              }`}
              onMouseEnter={(e) => onMouseEnter(e, index)}
              onClick={onClickHandler}
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
              {/* {user.username} - {user.display_name} */}
            </li>
          ))}
      </ul>
    </label>
  );
}
