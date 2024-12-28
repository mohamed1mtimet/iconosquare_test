import React, { useContext, useReducer, createContext } from "react";
import { createRandomEvent } from "../utils";

const LiveChartContext = createContext();

const initialEvents = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData = {
  events: initialEvents,
  isPlaying: true,
};

const liveChartReducer = (state, action) => {
  switch (action.type) {
    case "new_event":
      if (state.isPlaying)
        return {
          ...state,
          events: [...state.events, action.payload],
        };
      return state;
    case "toggle_play":
      return { ...state, isPlaying: !state.isPlaying };
    case "edit_event":
      return {
        ...state,
        events: state.events.map((event) =>
          event.index === action.payload.index ? action.payload : event
        ),
      };
    case "set_editing":
      return {
        ...state,
        events: state.events.map((event) =>
          event.index === action.payload.index
            ? { ...event, cellsEditState: action.payload.cellsEditState }
            : event
        ),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LiveChartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(liveChartReducer, initialData);
  return (
    <LiveChartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error(
      "useLiveChartContext should be used within an LiveChartProvider"
    );
  }

  return context;
};

export { LiveChartProvider, useLiveChartContext };
