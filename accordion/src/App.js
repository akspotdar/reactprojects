import "./styles.css";
import Accordion from "./Accordion";

// Problem from https://namastedev.com/practice/accordion
export default function App() {
  const items = [
    {
      title: "JavaScript Basics",
      content: "Learn variables, functions and loops",
    },
    {
      title: "React.js overview",
      content: "Understand components, state and props in react",
    },
    {
      title: "Node.js",
      content: "Basics of server side dev with node",
    },
    {
      title: "Full-stack development",
      content: "Build full stack apps with React and node",
    },
  ];
  return (
    <div className="App">
      <Accordion items={items} />
    </div>
  );
}
