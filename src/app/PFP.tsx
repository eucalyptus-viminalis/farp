"use client";

import { useContext, useEffect, useState } from "react";
import { EditContext } from "./edit/context";

type PFPProps = {
    href: string;
    src: string;
    size: number;
    mr?: boolean;
};
export default function PFP(props: PFPProps) {
    // Props
    const { href, size, src, mr } = props;
    // Context
    const context = useContext(EditContext);
    // State
    const [pfpUrl, setPfpUrl] = useState(context.state.user?.pfp_url ?? src);

    // Effects
    useEffect(() => {
        if (context.state.user) {
            setPfpUrl(context.state.user.pfp_url ?? "/dwr.png");
        }
    }, [context.state.user]);

    return (
        <span className="relative h-min w-auto" data-state="closed">
            <img
                loading="lazy"
                src={pfpUrl}
                className={`aspect-square shrink-0 rounded-full border object-cover bg-app border-default relative ${
                    mr ? "mr-2" : ""
                } `}
                alt="avatar"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                }}
            />
        </span>
    );
}
