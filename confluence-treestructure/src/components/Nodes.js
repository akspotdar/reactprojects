import { useState } from "react";
import { FaCircle, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Icon = ({ isOpen, isParentNode, onClick }) => {
  if (isParentNode) {
    return (
      <motion.span
        onClick={onClick}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <FaAngleRight />
      </motion.span>
    );
  }

  return <FaCircle style={{ height: "6px" }} />;
};

const Node = ({ label, link, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isParentNode = Boolean(children && children.length);
  return (
    <li>
      <div className="node">
        <div className="label">
          <Icon
            isOpen={isOpen}
            isParentNode={isParentNode}
            onClick={() => setIsOpen(!isOpen)}
          />
          <a href={link}>{label}</a>
        </div>
      </div>
      <AnimatePresence>
        {isParentNode && isOpen ? (
          <motion.div
            className="node-contents"
            variants={{
              collapsed: { height: 0, opacity: 0 },
              open: { height: "auto", opacity: 1 },
            }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.25 }}
          >
            <Nodes nodes={children} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
};

const Nodes = ({ nodes }) => {
  return (
    <ul className="nodes">
      {nodes.map((node) => {
        return <Node key={node.id} {...node} />;
      })}
    </ul>
  );
};

export default Nodes;
