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
import { EditContext } from "@/contexts/EditContext";
import Image from "next/image";
import UserSearchInput from "../../users/UserSearchInput";
import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import getData from "@/app/edit/serverAction";

type UsernameProps = {
    asEmbed?: boolean;
};
const DEFAULT_USERNAME = "dwr";

// Assumming root cast
export default function Username(props: UsernameProps) {
    // Props
    const { asEmbed } = props;
    // Context
    const context = useContext(EditContext);
    const cast = context.state.rootCast;
    const username = context.state.rootCast.usernameOverride;
    // States
    const [q, setQ] = useState<string>(cast.usernameOverride ?? "");
    const [showUsers, setShowUsers] = useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [users, setUsers] = useState<SearchedUser[]>([]);
    const [showInput, setShowInput] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLLabelElement>(null);
    const deferredQ = useDeferredValue(q);
    const [mousingAround, setMousingAround] = useState(false);

    // State mutations
    const updateUser = () => {
        const newUser = users[selectedIndex];
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

    // Handlers
    const onUserRowClick = (e: any) => {
        console.log("user row clicked!");
        e.preventDefault();
        updateUser();
        setShowInput(false);
        if (containerRef.current) {
            containerRef.current.hidden = true;
        }
        // setShowUsers(false);
    };
    const handleMouseLeave = () => {
        console.log("left");
        setMousingAround(false);
    };
    const onMouseEnter = (_: MouseEvent<HTMLLIElement>, i: number) => {
        setMousingAround(true);
        console.log(i);
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
            console.log("enter");
            updateUser();
            setShowInput(false);
        } else if (e.key === "Escape") {
            e.preventDefault();
            console.log("escaped");
        } else if (e.keyCode == 27) {
            e.preventDefault();
            console.log(27);
        }
        console.log("end");
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

    const handleBlur = () => {
        setShowInput(false);
        if (!username) {
            overrideUsername(DEFAULT_USERNAME);
        }
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        overrideUsername(e.currentTarget.value);
        setQ(e.currentTarget.value);
        setSelectedIndex(-1);
    };
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e);
        console.log("blurred");
        if (!mousingAround) {
            setShowInput(false);
            if (!cast.usernameOverride) {
                overrideUsername(DEFAULT_USERNAME);
                setQ(DEFAULT_USERNAME);
            }
            setShowUsers(false);
        }
    };
    // Fetch users and update state when query value changes
    useEffect(() => {
        if (deferredQ.length > 0) {
            // to prevent searching with an empty string
            const fetchData = async () => {
                try {
                    const result = await getData(deferredQ);
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
    }, [deferredQ]);
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
                console.log("LMAOOO!");
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
        window.addEventListener('keypress', handleKeyPress)

        // Cleanup event listener on component unmount
        return () => {
            if (inputElement) {
                inputElement.removeEventListener("keydown", handleKeyDown);
            }
            window.removeEventListener('keypress',handleKeyPress)
        };
    }, [handleBlur]);

    return (
        <>
            <label
                htmlFor="user-search-input"
                ref={containerRef}
                hidden={!showInput}
            >
                <input
                    ref={inputRef}
                    autoFocus
                    name="user-search-input"
                    className="
                    bg-inherit text-inherit font-mono
                "
                    style={{
                        minWidth: "8ch",
                        width: cast.usernameOverride.length + 1 + "ch",
                    }}
                    onChange={onInputChange}
                    value={cast.usernameOverride}
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
                    {showUsers &&
                        users.map((user, index) => (
                            <li
                                key={user.fid}
                                className={`bg-app p-2 border-b-2 border-faint ${
                                    selectedIndex === index ? "underline" : ""
                                }`}
                                onMouseEnter={(e) => onMouseEnter(e, index)}
                                onClick={onUserRowClick}
                                onClickCapture={() =>
                                    console.log("click captured")
                                }
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
                            </li>
                        ))}
                </ul>
            </label>
            <span
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
                    {"@" + username}
                </div>
            </span>
        </>
    );

    if (showInput) {
        return (
            // <input
            //     ref={inputRef}
            //     type="text"
            //     className={`
            //         bg-inherit
            //         ${!inputFocused && "hidden"}
            //         font-mono
            //     `}
            //     style={{
            //         minWidth: "8ch",
            //         width: username.length + 1 + "ch",
            //     }}
            //     autoFocus
            //     onFocus={handleFocus}
            //     onChange={onChangeHandler}
            //     value={username}
            //     onBlur={handleBlur}
            // />
            <UserSearchInput hidden={!showInput} toggleView={toggleInput} />
        );
    } else {
        return (
            <span className="relative h-min w-auto" data-state="closed">
                <div
                    title="Override username"
                    className={`relative text-muted hover:underline ${
                        asEmbed ? "text-sm" : ""
                    }`}
                    onClick={onSpanClick}
                >
                    {"@" + username}
                </div>
            </span>
        );
    }
}
