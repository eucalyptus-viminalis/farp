import { ReactNode } from "react";

export default function ConvoLayout({children}:{children:ReactNode}) {
    return (
        <div className="container bg-app mx-auto min-h-full h-full">
            <div className="flex min-h-screen flex-row justify-center">
                {children}
            </div>

        </div>
    );
}
