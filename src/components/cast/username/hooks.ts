'use client'
import {searchChannel, searchUser} from "@/app/serverAction";
import { Channel, SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { useEffect, useState } from "react";

export const useChannels = (q: string) => {

    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        if (q.length > 0) {
            const fetchData = async () => {
                try {
                    const result = await searchChannel(q);
                    setChannels(result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        } else {
            setChannels([]);
        }
    }, [q]);
    return channels
}

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