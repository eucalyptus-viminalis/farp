"use client";
import { useRealCasts } from "@/hooks/useRealCasts";
import { CastState } from "@/types/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type Page = "cast" | "dc";
export type Mode = "edit" | "preview";

type GlobalContext = {
    trendingCasts: CastState[];
    shuffleCasts: () => void;
    page: Page;
    setPage: Dispatch<SetStateAction<Page>>;
    setMode: Dispatch<SetStateAction<Mode>>;
    mode: Mode;
};

export const GlobalContext = createContext<GlobalContext>({
    trendingCasts: [],
    shuffleCasts: () => {},
    mode: 'edit',
    page: 'cast',
    setPage: () => {},
    setMode: () => {}
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const { realCasts, shuffleCasts } = useRealCasts();
    const [mode, setMode] = useState<Mode>('edit')
    const [page, setPage] = useState<Page>('cast')
    return (
        <GlobalContext.Provider
            value={{
                trendingCasts: realCasts,
                shuffleCasts,
                mode,
                page,
                setMode,
                setPage
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
