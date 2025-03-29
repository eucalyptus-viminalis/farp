import React from "react";

type EmbedsContainerProps = {
    children: React.ReactNode
}
export default function EmbedsContainer(props: EmbedsContainerProps) {
    const {children} = props
    return (
        <div className="mt-2 inline-flex flex-col justify-center space-y-1">
            {children}
        </div>
    );
}
