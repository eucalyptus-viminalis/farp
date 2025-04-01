"use client";

import { createStore } from "mipd";
import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useCallback,
  useState,
} from "react";
import sdk, {
  AddFrame,
  Context,
  FrameNotificationDetails,
} from "@farcaster/frame-sdk";

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

  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);
  const [lastEvent, setLastEvent] = useState("");
  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      setNotificationDetails(null);

      const result = await sdk.actions.addFrame();

      if (result.notificationDetails) {
        setNotificationDetails(result.notificationDetails);
      }
      setAddFrameResult(
        result.notificationDetails
          ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
          : "Added, got no notification details",
      );
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const initializeSdk = async () => {
      try {
        await sdk.actions.ready();
        const frameContext = await sdk.context;
        if (frameContext) {
          dispatch({ type: "SET_CONTEXT", payload: frameContext });
          dispatch({ type: "SET_SDK_LOADED", payload: true });
          sdk.actions.ready(); // Notify that the app is ready
          if (!frameContext.client.added) {
            await sdk.actions.addFrame();
          }
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
    const load = async () => {
      const context = await sdk.context;
      dispatch({ type: "SET_CONTEXT", payload: context });
      dispatch({ type: "SET_SDK_LOADED", payload: true });

      // Set up event listeners
      sdk.on("frameAdded", ({ notificationDetails }) => {
        console.log("Frame added", notificationDetails);
        setAdded(true);
        setNotificationDetails(notificationDetails ?? null);
        setLastEvent("Frame added");
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("Frame add rejected", reason);
        setAdded(false);
        setLastEvent(`Frame add rejected: ${reason}`);
      });

      sdk.on("frameRemoved", () => {
        console.log("Frame removed");
        setAdded(false);
        setLastEvent("Frame removed");
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("Notifications enabled", notificationDetails);
        setNotificationDetails(notificationDetails ?? null);
        setLastEvent("Notifications enabled");
      });

      sdk.on("notificationsDisabled", () => {
        console.log("Notifications disabled");
        setNotificationDetails(null);
        setLastEvent("Notifications disabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("Primary button clicked");
        setLastEvent("Primary button clicked");
      });

      // Call ready action
      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up MIPD Store
      const store = createStore();
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
      });
    };

    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
    if (!added) {
      addFrame();
    }
  }, [isSDKLoaded, added, addFrame]);

  // useEffect(() => {
  //   if (sdk && state.isSdkLoaded && !state.farcasterContext?.client.added) {
  //     sdk.actions.addFrame();
  //   }
  // }, [state.isSdkLoaded, state.farcasterContext?.client.added]);
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
