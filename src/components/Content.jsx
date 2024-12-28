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

  return (
    <div className="mx-auto max-w-7xl px-8">
      <button
        onClick={togglePlay}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 ml-auto mr-0 w-24	"
      >
        {state.isPlaying ? "Pause" : "Play"}
      </button>
      <LiveChart />

      <LiveTable />
    </div>
  );
};

export default Content;
