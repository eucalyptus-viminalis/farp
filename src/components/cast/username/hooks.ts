'use client'
import {searchUser} from "@/app/serverAction";
import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useEffect, useState } from "react";

export const useUsers = (q: string) => {

    const [users, setUsers] = useState<SearchedUser[]>([]);

    // Fetch users and update state when query value changes
    useEffect(() => {
        if (q.length > 0) {
            // to prevent searching with an empty string
            const fetchData = async () => {
                try {
                    const result = await searchUser(q);
                    setUsers(result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        } else {
            setUsers([]);
        }
    }, [q]);
    return users
}