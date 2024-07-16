import { ReactNode, Dispatch, createContext } from "react";
import { DCEditAction } from "./DCEditContext";
import { DC } from "@/types/types";

export type MessageEditContext = {
    msg: DC;
    msgIndex: number
    // updateCast: (newState: CastState) => void;
    updateMsg: (newState: DC, index: number) => void
    // deleteReply: (index: number) => void
    deleteMsg: (index: number) => void
    // replyIndex?: number;
    // lastIndex?: boolean;
};

const DEFAULT_DC: DC = {
    isSelfDC: true,
    timeDisplay: '4:20 PM',
    txt: 'default text',
    reactions: undefined,
    replyTo: undefined,
}

export const MESSAGE_EDIT_CONTEXT_DEFAULT: MessageEditContext = {
    // addDummyReply: () => { },
    // deleteReply: () => {},
    // cast: ROOT_CAST_DEFAULT,
    // updateCast: (newState: CastState) => { },
    // castType: 'root-cast',
    msgIndex: 0,
    deleteMsg: () => {},
    msg: DEFAULT_DC,
    updateMsg: () => {},
};

export const MessageEditContext = createContext<MessageEditContext>(MESSAGE_EDIT_CONTEXT_DEFAULT);

export type MessageEditProviderProps = {
    children: ReactNode;
    // cast: CastState;
    msg: DC
    msgIndex: number
    dispatch: Dispatch<DCEditAction>;
    // castType: CastType;
    // replyIndex?: number;
    // lastIndex?: boolean;
};


export const MessageEditProvider = (props: MessageEditProviderProps) => {
    const { msg, children, dispatch, msgIndex} = props;

    let updateMsg = (newState: DC, index: number) => {
        // dispatch({ type: "SET_ROOT_CAST", payload: newState });
        dispatch({
            payload: {
                index,
                msg: newState
            },
            type: 'UPDATE_MESSAGE',
        })
    };

    const deleteMsg = (index: number) => {
        // dispatch({type:'DELETE_REPLY', payload: index})
        dispatch({
            payload: {index},
            type: 'DELETE_MESSAGE',
        })
    }

    return (
        <MessageEditContext.Provider 
            value={{ 
                // cast, updateCast, addDummyReply, castType, replyIndex, lastIndex, deleteReply 
                msgIndex,
                deleteMsg,
                msg,
                updateMsg,
            }}
        >
            {children}
        </MessageEditContext.Provider>
    );
};