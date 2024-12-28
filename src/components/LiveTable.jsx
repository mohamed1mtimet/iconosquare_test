import React, { useCallback, useEffect, useState } from "react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const Cell = ({ value, onValueChange, setIsEditing, isEditing }) => {
  const [localValue, setLocalValue] = useState(value || 0);
  const editValue = useCallback(() => {
    onValueChange(localValue);
    setIsEditing(false);
  }, [onValueChange, localValue, setIsEditing]);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className=" border-gray-300 border-t h-11">
      {isEditing ? (
        <input
          value={localValue}
          className="w-full h-full bg-gray-200"
          autoFocus
          type="number"
          onChange={(evt) => setLocalValue(evt.target.value)}
          onBlur={editValue}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              editValue();
            }
          }}
        />
      ) : (
        <div onClick={() => setIsEditing(!isEditing)} className="p-2">
          {localValue}
        </div>
      )}
    </div>
  );
};
const DataRow = ({ event }) => {
  const { dispatch } = useLiveChartContext();
  const cellsEditState = event.cellsEditState || [];
  return (
    <div key={event.index} className="border-l border-gray-300 flex-1">
      <div className="p-2">{event.index}</div>

      <Cell
        value={event.value1}
        isEditing={cellsEditState[0]}
        setIsEditing={(v) =>
          dispatch({
            type: "set_editing",
            payload: { index: event.index, cellsEditState: [v, false] },
          })
        }
        onValueChange={(value) => {
          dispatch({
            type: "edit_event",
            payload: { ...event, value1: value },
          });
        }}
      />
      <Cell
        value={event.value2}
        isEditing={cellsEditState[1]}
        setIsEditing={(v) =>
          dispatch({
            type: "set_editing",
            payload: { index: event.index, cellsEditState: [false, v] },
          })
        }
        onValueChange={(value) => {
          dispatch({
            type: "edit_event",
            payload: { ...event, value2: value },
          });
        }}
      />
    </div>
  );
};
const LiveTable = (props) => {
  const { state } = useLiveChartContext();
  const windwEnd =
    state.windwEnd === -1 ? state?.events?.length : state.windwEnd;
  const eventsFiltered = state.events.slice(windwEnd - 20, windwEnd);
  return (
    <div className="flex border border-gray-300 rounded">
      <div>
        <div className="p-2">Index</div>
        <div className="p-2 border-t border-gray-300 h-11">Value 1</div>
        <div className="p-2 border-t border-gray-300 h-11">Value 2</div>
      </div>
      {eventsFiltered.map((event) => (
        <DataRow key={event.index} event={event} />
      ))}
    </div>
  );
};

LiveTable.propTypes = {};

export default LiveTable;
