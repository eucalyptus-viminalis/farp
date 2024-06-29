'use client'
import { useRealCasts } from "@/hooks/useRealCasts";
import { CastState } from "@/types/types";
import { ReactNode, createContext} from "react";

type GlobalContext = {
    trendingCasts: CastState[]
    shuffleCasts: () => void
}

export const GlobalContext = createContext<GlobalContext>({trendingCasts: [], shuffleCasts: ()=>{}})

export function GlobalContextProvider({children}: {children: ReactNode}) {
    const {realCasts,shuffleCasts} = useRealCasts()
    return (
        <GlobalContext.Provider value={{
            trendingCasts: realCasts,
            shuffleCasts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}