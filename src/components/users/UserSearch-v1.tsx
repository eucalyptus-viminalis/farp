"use client";

import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";
import { EditContext } from "../../app/edit/context";
import { useUsers } from "./hooks";

// Assuming rootCast
export default function UserSearch() {
    // Context
    // TODO: Create cast context
    const context = useContext(EditContext);
    const cast = context.state.rootCast;
    // States
    const [q, setQ] = useState<string>("");
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [selectedUser, setSelectedUser] = useState<SearchedUser | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const users = useUsers(q)

    // Handlers
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setShowUsers(true);
        setQ(e.currentTarget.value);
    };
    const onMouseEnter = (e: MouseEvent<HTMLLIElement>, i: number) => {
        setSelectedIndex(i);
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
                Math.min(prevIndex + 1, users.length - 1)
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
    const updateUser = () => {
        const newUser = users[selectedIndex]
        setSelectedUser(newUser);
        // context.dispatch({type: 'SET_USER', payload: users[selectedIndex]})
        // context.dispatch({type: 'SET_ROOT_CAST', payload: users[selectedIndex]})
        context.dispatch({
            type: "SET_ROOT_CAST",
            payload: { 
                ...cast, 
                user: newUser,
                pfpOverride: newUser.pfp_url ?? '/dwr.png',
                usernameOverride: newUser.username,
                displayNameOverride: newUser.display_name ?? 'Unknown',
                activeBadgeOverride: newUser.power_badge
            },
        });
    };

    const onClickHandler = (e: any) => {
        e.preventDefault();
        updateUser();
        setShowUsers(false);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log(e);
    };

    useEffect(()=> {
        setSelectedIndex(-1)
    },[users])

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
        <div ref={containerRef} className="relative w-96">
            {selectedUser && (
                <div>
                    <h2>Selected User</h2>
                    <p>
                        {selectedUser.username} - {selectedUser.display_name}
                    </p>
                    <span>{selectedUser.pfp_url}</span>
                </div>
            )}
            <label className="">
                {/* <input
                    className="bg-inherit text-inherit border border-app"
                    onChange={onChangeHandler}
                    type="text"
                    onKeyDown={onKeyDownHandler}
                    onBlur={onBlur}
                    onFocus={() => setShowUsers(true)}
                    // onBlur={e=>}
                /> */}
            </label>
            <ul className="w-96 absolute z-10 overflow-y-scroll bg-white max-h-48">
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
                                    <span className="font-semibold">
                                        {user.display_name}
                                    </span>
                                    <span className="text-muted">
                                        {"@" + user.username}
                                    </span>
                                </div>
                            </div>
                            {/* {user.username} - {user.display_name} */}
                        </li>
                    ))}
            </ul>
            {/* <button onClick={onClickHandler}>load user</button> */}
        </div>
    );
}
