"use client";

import sdk, { Context } from "@farcaster/frame-sdk";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export interface FrameContext {
  state: FrameState;
  dispatch: Dispatch<FrameAction>;
}
export const FrameContext = createContext<FrameContext>({} as FrameContext);

export interface FrameState {
  farcasterContext: Context.FrameContext | null;
  isSdkLoaded: boolean;
}

const initialState: FrameState = {
  farcasterContext: null,
  isSdkLoaded: false,
};

export type FrameAction =
  | { type: "SET_CONTEXT"; payload: { farcasterContext: Context.FrameContext } }
  | { type: "UPDATE_IS_SDK_LOADED"; payload: { isSdkLoaded: boolean } };

const reducer = (state: FrameState, action: FrameAction): FrameState => {
  const { payload, type } = action;
  switch (type) {
    case "SET_CONTEXT":
      return {
        ...state,
        farcasterContext: payload.farcasterContext,
      };
    case "UPDATE_IS_SDK_LOADED":
      return {
        ...state,
        isSdkLoaded: payload.isSdkLoaded,
      };
    default:
      return state;
  }
};

export const FarcasterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadFakeContext = () => {
      console.log("loading fake ctx");
      const fakeContext: Context.FrameContext = {
        client: { added: false, clientFid: -1 },
        user: { fid: 2 },
      };
      dispatch({
        type: "SET_CONTEXT",
        payload: { farcasterContext: fakeContext },
      });
      dispatch({
        type: "UPDATE_IS_SDK_LOADED",
        payload: { isSdkLoaded: false },
      });
    };
    const loadContext = async () => {
      try {
        console.log("trying to load frame ctx now...");
        const frameContext = await sdk.context;
        if (frameContext) {
          dispatch({
            type: "UPDATE_IS_SDK_LOADED",
            payload: { isSdkLoaded: true },
          });
          dispatch({
            type: "SET_CONTEXT",
            payload: { farcasterContext: frameContext },
          });
          sdk.actions.ready();
        } else {
          // loadFakeContext();
          // do nothing
          console.debug("sdk.context not found");
        }
      } catch (error) {
        console.error("Failed to load SDK context:", error);
        // loadFakeContext();
      }
    };

    if (sdk && !state.isSdkLoaded) {
      loadContext();
      console.log(JSON.stringify(state.farcasterContext));
    } else if (state.isSdkLoaded) {
      sdk.actions.ready();
    }
  }, [state.isSdkLoaded, state.farcasterContext]);

  return (
    <FrameContext.Provider value={{ state, dispatch }}>
      {children}
    </FrameContext.Provider>
  );
};

export const useFarcasterCtx = () => {
  const context = useContext(FrameContext);

  if (!context) {
    throw new Error("useFarcasterCtx must be used within a FrameProvider");
  }

  return context;
};
