import React, { useReducer, ReactNode, Dispatch } from 'react';
import { SearchedUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";

// Define the shape of the state
export type PreviewMode = 'timeline-web' | 'expanded-web' | 'timeline-mobile' | 'expanded-mobile'

export type CastState = {
    user?: SearchedUser
    pfpOverride: string
    displayNameOverride: string
    usernameOverride: string
    activeBadgeOverride: boolean
    ago: string
    liked: boolean
    recasted: boolean
    bookmarked: boolean
    imageEmbeds: string[]
    castText: string
    replyCount: number
    likeCount: number
    channelName?: string
}

const DEFAULT_PFP_URL = '/dwr.png'

const initialCastState: CastState = {
    ago: '1h',
    bookmarked: false,
    activeBadgeOverride: true,
    castText: '',
    displayNameOverride: 'Dan Romero',
    imageEmbeds: [],
    liked: false,
    pfpOverride: DEFAULT_PFP_URL,
    recasted: false,
    usernameOverride: 'dwr',
    user: undefined,
    replyCount: 69,
    likeCount: 420,
    channelName: 'degen'
}
interface State {
    previewMode: PreviewMode
    user?: SearchedUser;
    rootCast: CastState
    quoteCast?: CastState
    replies?: CastState[]
}

// Define the initial state
const initialState: State = {
    previewMode: 'timeline-web',
    user: undefined,
    quoteCast: undefined,
    replies: [],
    rootCast: initialCastState
};

// Define the possible actions
type Action = 
    | { type: 'SET_USER'; payload: SearchedUser}
    | { type: 'CLEAR_USER' }
    | { type: 'SET_PREVIEW_MODE', payload: PreviewMode}
    | { type: 'SET_QUOTE_CAST', payload: CastState}
    | { type: 'SET_ROOT_CAST', payload: CastState}
    | { type: 'SET_REPLIES', payload: CastState[]}

// Define the reducer function with types
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'CLEAR_USER':
            return { ...state, user: undefined };
        case 'SET_PREVIEW_MODE':
            return {...state, previewMode: action.payload}
        case 'SET_QUOTE_CAST':
            return {...state, quoteCast: action.payload}
        case 'SET_REPLIES':
            return {...state, replies: action.payload}
        case 'SET_ROOT_CAST':
            return {...state, rootCast: action.payload}
        default:
            return state;
    }
};


// Define a context and provider
interface EditContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

const EditContext = React.createContext<EditContextProps>({} as EditContextProps);

const EditProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <EditContext.Provider value={{ state, dispatch }}>
            {children}
        </EditContext.Provider>
    );
};

export { EditProvider, EditContext };
