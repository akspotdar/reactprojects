import Shape from "./Shape";
import "./styles.css";
//use this data to create shape
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];
export default function App() {
  return (
    <div>
      <Shape data={BOX_DATA} />
    </div>
  );
}
