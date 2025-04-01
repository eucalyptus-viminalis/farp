"use client";
import { ROOT_CAST_DEFAULT } from "@/app/(cast)/_context/CastEditContext";
import { CastState } from "@/types/types";
import { PreviewMode } from "@/types/types";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { useFarcasterCtx } from "./FarcasterCtx";

type ReplyUser = {
  username: string;
  pfp: string;
  fid: number;
};

export interface EditState {
  previewMode: PreviewMode;
  user: ReplyUser;
  rootCast: CastState;
  quoteCast?: CastState;
}

export type EditAction =
  | { type: "SET_PREVIEW_MODE"; payload: PreviewMode }
  | { type: "SET_USER"; payload: ReplyUser }
  | { type: "SET_QUOTE_CAST"; payload: CastState }
  | { type: "SET_ROOT_CAST"; payload: CastState }
  | {
      type: "UPDATE_REPLY";
      payload: { updatedState: CastState; index: number };
    }
  | { type: "UPDATE_QUOTE_CAST"; payload: CastState }
  | { type: "ADD_REPLY"; payload: CastState }
  | { type: "DELETE_REPLY"; payload: number };

export interface EditContext {
  state: EditState;
  dispatch: Dispatch<EditAction>;
}

export const EditContext = createContext<EditContext>({} as EditContext);

const reducer = (state: EditState, action: EditAction): EditState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_PREVIEW_MODE":
      return { ...state, previewMode: action.payload };
    case "SET_QUOTE_CAST":
      return { ...state, quoteCast: action.payload };
    case "SET_ROOT_CAST":
      return { ...state, rootCast: action.payload };
    case "UPDATE_REPLY":
      const updatedReplies = state.rootCast.replies ?? [];
      updatedReplies[action.payload.index] = action.payload.updatedState;
      return {
        ...state,
        rootCast: { ...state.rootCast, replies: updatedReplies },
      };
    case "ADD_REPLY":
      return {
        ...state,
        rootCast: {
          ...state.rootCast,
          replyCount: state.rootCast.replyCount + 1,
          replies: [...(state.rootCast.replies ?? []), action.payload],
        },
      };
    case "DELETE_REPLY":
      return {
        ...state,
        rootCast: {
          ...state.rootCast,
          replies: state.rootCast.replies
            ? state.rootCast.replies.filter(
                (_, index) => index !== action.payload,
              )
            : [],
        },
      };
    case "UPDATE_QUOTE_CAST":
      return { ...state, quoteCast: action.payload };
    default:
      return state;
  }
};
// {
//     "object": "user",
//     "fid": 3,
//     "custody_address": "0x6b0bda3f2ffed5efc83fa8c024acff1dd45793f1",
//     "username": "dwr.eth",
//     "display_name": "Dan Romero",
//     "pfp_url": "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA",
//     "profile": {
//         "bio": {
//             "text": "Working on Farcaster and Warpcast."
//         }
//     },
//     "follower_count": 419284,
//     "following_count": 3224,
//     "verifications": [
//         "0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea",
//         "0xd7029bdea1c17493893aafe29aad69ef892b8ff2"
//     ],
//     "verified_addresses": {
//         "eth_addresses": [
//             "0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea",
//             "0xd7029bdea1c17493893aafe29aad69ef892b8ff2"
//         ],
//         "sol_addresses": []
//     },
//     "active_status": "inactive",
//     "power_badge": true
// },

const initialState: EditState = {
  previewMode: "timeline-web",
  user: {
    fid: 3,
    pfp: "/dwr.png",
    username: "dwr",
  },
  quoteCast: undefined,
  rootCast: ROOT_CAST_DEFAULT,
};

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // grab fc ctx
  const { state: fcState } = useFarcasterCtx();
  useEffect(() => {
    if (fcState.isSdkLoaded && fcState.farcasterContext) {
      const { fid, pfpUrl, username } = fcState.farcasterContext.user;
      if (fid && pfpUrl && username) {
        dispatch({
          type: "SET_USER",
          payload: {
            fid,
            pfp: pfpUrl,
            username,
          },
        });
      } else {
        console.debug("fid, pfpUrl or username null in frameContext");
      }
    } else {
      console.debug("sdk not loaded when initializing EditContext state");
    }
  }, [fcState]);
  return (
    <EditContext.Provider value={{ state, dispatch }}>
      {children}
    </EditContext.Provider>
  );
};
