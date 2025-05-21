import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex == index ? null : index);
  };

  return !items || items.length == 0 ? (
    "No items available"
  ) : (
    <div className="accordion">
      {items.map((item, index) => {
        return (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {openIndex != index ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            {openIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
