"use client";

import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import sdk, { Context } from "@farcaster/frame-sdk";

// Define the shape of our state
interface FrameState {
  farcasterContext: Context.FrameContext | null;
  isSdkLoaded: boolean;
}

// Define action types
type FrameAction =
  | { type: "SET_CONTEXT"; payload: Context.FrameContext }
  | { type: "SET_SDK_LOADED"; payload: boolean };

// Initial state
const initialState: FrameState = {
  farcasterContext: null,
  isSdkLoaded: false,
};

// Reducer function to manage state transitions
const reducer = (state: FrameState, action: FrameAction): FrameState => {
  switch (action.type) {
    case "SET_CONTEXT":
      return { ...state, farcasterContext: action.payload };
    case "SET_SDK_LOADED":
      return { ...state, isSdkLoaded: action.payload };
    default:
      return state;
  }
};

// Create context with initial state
const FrameContext = createContext<
  { state: FrameState; dispatch: Dispatch<FrameAction> } | undefined
>(undefined);

// Provider component to wrap your application
export const FarcasterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initializeSdk = async () => {
      try {
        await sdk.actions.ready(); // Ensure the SDK is fully loaded
        const frameContext = await sdk.context;
        if (frameContext) {
          dispatch({ type: "SET_CONTEXT", payload: frameContext });
          dispatch({ type: "SET_SDK_LOADED", payload: true });
          sdk.actions.ready(); // Notify that the app is ready
        } else {
          console.error("Failed to retrieve Farcaster context.");
        }
        // if (!frameContext.client.added) {
        //   await sdk.actions.addFrame();
        // }
      } catch (error) {
        console.error("Error initializing Farcaster SDK:", error);
      }
    };
    // if (!state.isSdkLoaded) {
    initializeSdk();
    // }
  });

  useEffect(() => {
    if (state.isSdkLoaded && !state.farcasterContext?.client.added) {
      sdk.actions.addFrame();
    }
  }, [state.isSdkLoaded, state.farcasterContext?.client.added]);

  return (
    <FrameContext.Provider value={{ state, dispatch }}>
      {children}
    </FrameContext.Provider>
  );
};

// Custom hook to use the FrameContext
export const useFarcasterCtx = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error("useFarcasterCtx must be used within a FarcasterProvider");
  }
  return context;
};
