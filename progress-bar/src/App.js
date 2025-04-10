import { useEffect, useState } from "react";
import "./styles.css";

// This component displays a progress bar that animates to the given progress value.
const ProgressBar = ({ progress }) => {
  // State to track the current progress value for animation
  const [currentProgress, setCurrentProgress] = useState(0);

  // useEffect to update the progress value with a slight delay for animation
  useEffect(() => {
    setTimeout(() => setCurrentProgress(progress), 100);
  }, [progress]);

  return (
    <div className="progress-bar-container">
      {/* Inner progress bar with dynamic styles */}
      <div
        className="progress-bar-inner"
        style={{
          // Using transform: translateX() is generally more performant and smooth for animations than changing width,
          // as it often avoids triggering layout recalculations and can be hardware-accelerated.
          // width: `${currentProgress}%`,
          transform: `translateX(${currentProgress - 100}%)`,
          // Change text color based on progress value
          color: currentProgress < 5 ? "black" : "white",
        }}
        role="progressbar" // Accessibility: ARIA role for progress bar
        aria-valuenow={currentProgress} // Current progress value
        aria-valuemin="0" // Minimum progress value
        aria-valuemax="100" // Maximum progress value
      >
        {/* Display the current progress percentage */}
        {currentProgress}%
      </div>
    </div>
  );
};

// This component renders multiple progress bars with different progress values.
export default function App() {
  // Array of progress values for the progress bars
  const bars = [4, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="App">
      <h1>Progress Bar</h1>
      {/* Render a ProgressBar for each value in the bars array */}
      {bars.map((item) => (
        <ProgressBar key={item} progress={item} />
      ))}
    </div>
  );
}
