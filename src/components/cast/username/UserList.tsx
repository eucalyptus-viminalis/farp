'use client'

import { useUsers } from "./hooks";
import {MouseEvent} from 'react'
import Image from 'next/image'

type UserListProps = {
    deferredQ: string
    setSelectedIndex?: any
    selectedIndex?: number
}
export default function UserList(props: UserListProps) {
    const {deferredQ,setSelectedIndex,selectedIndex} = props
    const users = useUsers(deferredQ)
    const onMouseEnter = (_: MouseEvent<HTMLLIElement>, i: number) => {
        // setSelectedIndex(i);
    };
    const handleMouseLeave = () => {
    };
    const onUserRowClick = (e: any) => {
        e.preventDefault();
        // updateUser();
        // setShowInput(false);
        // if (containerRef.current) {
        //     containerRef.current.hidden = true;
        // }
        // setShowUsers(false);
    };
    if (!users || users.length == 0) return null
    return (
        <ul
            onMouseLeave={handleMouseLeave}
            className="w-96 absolute z-20 rounded-lg border border-faint bg-app overflow-auto max-h-72"
        >
            {users.map((user, index) => (
                    <li
                        key={user.fid}
                        className={`bg-app p-2 z-20 hover:cursor-pointer border-b-2 border-faint ${
                            selectedIndex === index ? "underline" : ""
                        }`}
                        onMouseEnter={(e) => onMouseEnter(e, index)}
                        onClick={onUserRowClick}
                        onClickCapture={() => console.log("click captured")}
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
    );
}
