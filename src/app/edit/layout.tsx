'use client'
import { ReactNode } from "react";
import { EditProvider } from "@/contexts/EditContext";

export default function EditLayout({children}: {children: ReactNode}) {
    return (
        <EditProvider>
            {children}
        </EditProvider>
    )
}