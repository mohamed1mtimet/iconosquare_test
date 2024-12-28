import React, { useCallback } from "react";
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

  return (
    <div className="mx-auto max-w-7xl px-8">
      <div className="flex gap-3 justify-end mb-2">
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
    </div>
  );
};

export default Content;
