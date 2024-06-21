'use client'
import { ReactNode } from "react";
import { EditProvider } from "./context";

export default function EditLayout({children}: {children: ReactNode}) {
    return (
        <EditProvider>
            {children}
        </EditProvider>
    )
}