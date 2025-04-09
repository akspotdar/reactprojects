import "./styles.css";

import CHART_DATA from "./data";
import BarChart from "./BarChart";
import { useState } from "react";

export default function App() {
  const [showChart, setShowChart] = useState(false);
  return (
    <main className="container">
      <button
        onClick={() => {
          setShowChart((prev) => !prev);
        }}
      >
        Toggle Chart
      </button>
      {showChart ? <BarChart data={CHART_DATA} /> : null}
    </main>
  );
}
