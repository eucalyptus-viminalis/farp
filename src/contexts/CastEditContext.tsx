import { EditAction } from "@/app/_context/EditContext";
import { ROOT_CAST_DEFAULT, REPLY_DEFAULT } from "@/types/types";
import { CastType } from "@/types/types";
import { CastState } from "@/types/types";
import { ReactNode, Dispatch, createContext } from "react";

export type CastEditContext = {
  cast: CastState;
  updateCast: (newState: CastState) => void;
  deleteReply: (index: number) => void;
  addDummyReply: () => void;
  castType?: CastType;
  replyIndex?: number;
  lastIndex?: boolean;
};

export const CAST_EDIT_CONTEXT_DEFAULT: CastEditContext = {
  addDummyReply: () => {},
  deleteReply: () => {},
  cast: ROOT_CAST_DEFAULT,
  updateCast: (newState: CastState) => {},
  castType: "root-cast",
};

export const CastEditContext = createContext<CastEditContext>(
  CAST_EDIT_CONTEXT_DEFAULT,
);

export type CastEditProviderProps = {
  children: ReactNode;
  cast: CastState;
  dispatch: Dispatch<EditAction>;
  castType: CastType;
  replyIndex?: number;
  lastIndex?: boolean;
};

export const CastEditProvider = (props: CastEditProviderProps) => {
  const { cast, children, dispatch, castType, replyIndex, lastIndex } = props;

  let updateCast = (newState: CastState) => {
    dispatch({ type: "SET_ROOT_CAST", payload: newState });
  };
  if (castType === "reply" && replyIndex !== undefined) {
    updateCast = (newState: CastState) => {
      dispatch({
        type: "UPDATE_REPLY",
        payload: { index: replyIndex, updatedState: newState },
      });
    };
  }

  const deleteReply = (index: number) => {
    dispatch({ type: "DELETE_REPLY", payload: index });
  };

  const addDummyReply = () => {
    dispatch({
      type: "ADD_REPLY",
      payload: {
        ...REPLY_DEFAULT,
      },
    });
  };

  return (
    <CastEditContext.Provider
      value={{
        cast,
        updateCast,
        addDummyReply,
        castType,
        replyIndex,
        lastIndex,
        deleteReply,
      }}
    >
      {children}
    </CastEditContext.Provider>
  );
};
