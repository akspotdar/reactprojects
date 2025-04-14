import DATA from "./data";
import Game from "./Game";
import "./styles.css";

//Country Capital Game
// Implement a game to match countries with their capitals
export default function App() {
  return (
    <div className="App">
      <Game data={DATA} />
    </div>
  );
}
