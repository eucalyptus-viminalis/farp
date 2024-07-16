"use client";
import { DC } from "@/types/types";
import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export interface DCEditContext {
    state: DCEditState;
    dispatch: Dispatch<DCEditAction>;
}
export const DCEditContext = createContext<DCEditContext>({} as DCEditContext);

export interface DCEditState {
    user?: SearchedUser;
    pfpOverride: string;
    displayNameOverride: string;
    usernameOverride: string;
    activeBadgeOverride: boolean;
    msgs: DC[];
}

const initialState: DCEditState = {
    activeBadgeOverride: true,
    displayNameOverride: 'Dan Romero',
    msgs: [],
    pfpOverride: '/dwr.png',
    user: undefined,
    usernameOverride: 'dwr',
}

export type DCEditAction =
    | { type: "SET_USER"; payload: SearchedUser }
    | { type: "ADD_MESSAGE"; payload: DC }
    | { type: "RESET_MESSAGES"; payload: true }
    | { type: "UPDATE_MESSAGE"; payload: {msg: DC, index: number} }
    | { type: "DELETE_MESSAGE"; payload: { index: number } }
    | { type: "OVERRIDE_PFP"; payload: string }
    | { type: "OVERRIDE_DISPLAY_NAME"; payload: string }
    | { type: "OVERRIDE_USERNAME"; payload: string }
    | { type: "OVERRIDE_ACTIVE_BADGE"; payload: boolean }
    | { type: "OVERRIDE_MULTI"; payload: {
        pfp: string
        displayName: string
        username: string
        activeBadge: boolean
    } };

const reducer = (state: DCEditState, action: DCEditAction): DCEditState => {
    const { payload, type } = action;
    switch (type) {
        case "SET_USER":
            return { 
                ...state, 
                user: payload,
                activeBadgeOverride: payload.power_badge,
                displayNameOverride: payload.display_name ?? 'unknown',
                pfpOverride: payload.pfp_url ?? '/dwr.png',
                usernameOverride: payload.username
            };
        case "ADD_MESSAGE":
            return { ...state, msgs: [...state.msgs, payload] };
        case "RESET_MESSAGES":
            return { ...state, msgs: [] };
        case "UPDATE_MESSAGE":
            const newMsgs = state.msgs
            newMsgs[payload.index] = payload.msg
            return { ...state, msgs: newMsgs };
        case "DELETE_MESSAGE":
            return { ...state, msgs: [...state.msgs.filter((_,i) => i !== payload.index)] };
        case "OVERRIDE_PFP":
            return { ...state, pfpOverride: payload };
        case "OVERRIDE_ACTIVE_BADGE":
            return { ...state, activeBadgeOverride: payload };
        case "OVERRIDE_DISPLAY_NAME":
            return {
                ...state,
                displayNameOverride: payload,
            };
        case "OVERRIDE_USERNAME":
            return {
                ...state,
                usernameOverride: payload
            };
        case "OVERRIDE_MULTI":
            return {
                ...state,
                usernameOverride: payload.username,
                pfpOverride: payload.pfp,
                activeBadgeOverride: payload.activeBadge,
                displayNameOverride: payload.displayName
            };
        default:
            return state;
    }
};

export const DCEditProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DCEditContext.Provider value={{ state, dispatch }}>
            {children}
        </DCEditContext.Provider>
    );
};



