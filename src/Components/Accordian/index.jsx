import React, { useState } from "react";
import { data } from "./data";
import "./styles.css";

export default function Accordian() {
  const [singleSelected, setSingleSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
    findIndexOfCurrentId === -1
      ? copyMultiple.push(getCurrentId)
      : copyMultiple.splice(findIndexOfCurrentId, 1);
    setMultiple(copyMultiple);
  }

  function handleSingleSelection(getCurrentId) {
    setSingleSelected(singleSelected === getCurrentId ? null : getCurrentId);
  }
  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setMultiple([]);
          setSingleSelected(null);
          setEnableMultiSelection(!enableMultiSelection);
        }}
      >
        {enableMultiSelection ? "Disable" : "Enable"} Multiple Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                className="title"
                onClick={() =>
                  enableMultiSelection
                    ? handleMultiSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection ? (
                multiple.includes(dataItem.id) ? (
                  <div className="content">{dataItem.answer}</div>
                ) : (
                  ""
                )
              ) : singleSelected === dataItem.id ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>no data is found</div>
        )}
      </div>
    </div>
  );
}
