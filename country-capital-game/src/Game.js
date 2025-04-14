import { useEffect, useState } from "react";
import classnames from "classnames";

// shuffle the array - Fisher-Yates Sorting Algorithm
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Game = ({ data }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctSelections, setCorrectSelections] = useState([]);
  const [matched, setMatched] = useState(new Set());

  useEffect(function onMount() {
    const allOptions = Object.entries(data).flat();
    setOptions(shuffle(allOptions));
  }, []);

  const handleSelection = (e) => {
    const { target } = e;
    const value = target.getAttribute("data-value");
    if (selectedOptions.length === 2 || selectedOptions.includes(value)) {
      return null;
    }

    const newSelection = selectedOptions.concat(value);
    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (data[first] === second || data[second] === first) {
        setCorrectSelections(newSelection);
        setTimeout(() => {
          setMatched(new Set([...matched, ...newSelection]));
          setCorrectSelections([]);
          setSelectedOptions([]);
        }, 1000);
      } else {
        setSelectedOptions(newSelection);
        setTimeout(function reset() {
          setSelectedOptions([]);
        }, 1000);
      }
    } else {
      setSelectedOptions(newSelection);
    }
  };

  if (matched.size === options.length) {
    return (
      <div className="game-board">
        <h1>Congratulations</h1>
      </div>
    );
  }

  return (
    <div className="game-board">
      {options.map((option) => {
        if (matched.has(option)) {
          return null;
        }
        const isSelected =
          selectedOptions.includes(option) ||
          correctSelections.includes(option);
        const isCorrect = correctSelections.includes(option);
        const isIncorrect =
          selectedOptions.length === 2 && isSelected & !isCorrect;
        return (
          <button
            className={classnames(
              "option",
              isSelected && "selected",
              isIncorrect && "incorrect",
              isCorrect && "correct"
            )}
            key={option}
            onClick={handleSelection}
            data-value={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Game;
