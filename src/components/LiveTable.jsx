import React, { useCallback, useState } from "react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";

const Cell = ({ value: initialValue, onValueChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const editValue = useCallback(() => {
    onValueChange(value);
    setIsEditing(false);
  }, [onValueChange, value]);
  return (
    <div className=" border-gray-300 border-t h-11">
      {isEditing ? (
        <input
          value={value}
          className="w-full h-full bg-gray-200"
          autoFocus
          type="number"
          onChange={(evt) => setValue(evt.target.value)}
          onBlur={editValue}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") {
              editValue();
            }
          }}
        />
      ) : (
        <div onClick={() => setIsEditing(!isEditing)} className="p-2">
          {value}
        </div>
      )}
    </div>
  );
};
const DataRow = ({ event }) => {
  const { dispatch } = useLiveChartContext();
  return (
    <div key={event.index} className="border-l border-gray-300 flex-1">
      <div className="p-2">{event.index}</div>

      <Cell
        value={event.value1}
        onValueChange={(value) => {
          dispatch({
            type: "edit_event",
            payload: { ...event, value1: value },
          });
        }}
      />
      <Cell
        value={event.value2}
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
  const nbTotalEvents = state?.events?.length;
  const eventsFiltered = state.events.slice(nbTotalEvents - 20, nbTotalEvents);
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
