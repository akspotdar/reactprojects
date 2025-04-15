// create a shape based on 2D Array
// add empty boxes where value is 1, when 0 render nothing
// when user click on box bgColor change to green
// when all shapes selected, deselect in order of selection
// also disable interactions during the deselect process

import { useEffect, useMemo, useState, useRef } from "react";
import classnames from "classnames";

const Shape = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef(null);

  const countVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  const [selected, setSelected] = useState(new Set());
  const handleClick = (e) => {
    const { target } = e;
    const index = target.getAttribute("data-index");
    const status = target.getAttribute("data-status");
    if (
      index === null ||
      status == "hidden" ||
      selected.has(index) ||
      unloading
    ) {
      return;
    }
    setSelected((prev) => {
      return new Set(prev.add(index));
    });
  };

  const unload = () => {
    //remove box after 500ms
    setUnloading(true);
    const keys = Array.from(selected.keys());
    console.log(keys);
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });

        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
        clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    console.log(selected);
    if (selected.size >= countVisibleBoxes) {
      unload();
    }
  }, [selected]);

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((item, index) => {
        const status = item === 1 ? "visible" : "hidden";
        const isSelected = selected.has(index.toString());
        return (
          <div
            key={`${item}-${index}`}
            className={classnames("box", status, isSelected && "selected")}
            data-index={index}
            data-status={status}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
