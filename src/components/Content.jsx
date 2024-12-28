import React, { useCallback, useState } from "react";
import LiveTable from "./LiveTable";
import LiveChart from "./LiveChart";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const Content = () => {
  const { dispatch, state } = useLiveChartContext();
  const togglePlay = useCallback(() => {
    dispatch({
      type: "toggle_play",
    });
  }, [dispatch]);

  const resetEvents = useCallback(() => {
    dispatch({
      type: "reset_events",
    });
  }, [dispatch]);
  const v = Math.ceil(
    (state.windwEnd === -1
      ? state?.events?.length
      : state.windwEnd / state?.events?.length) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-8 pb-20">
      <div className="flex gap-3 justify-end mb-11">
        <button
          onClick={resetEvents}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
        >
          Reset
        </button>
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
        >
          {state.isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <LiveChart />

      <LiveTable />

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={v}
        onChange={(evt) => {
          const value = evt.target.value;
          const p = parseInt(evt.target.value) / 100;
          const end = Math.max(20, Math.floor(state.events.length * p));

          dispatch({
            type: "set_window",

            payload: value === "100" ? -1 : end,
          });
        }}
      />
    </div>
  );
};

export default Content;
