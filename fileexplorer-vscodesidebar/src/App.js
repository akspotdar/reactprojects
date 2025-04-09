// Nested File Folder Structure in React
// add remove file/folder

import "./styles.css";
import { useState } from "react";
import json from "./data.json";

/**
 * Recursive List Component
 * Renders the file/folder structure.
 *
 * @param {object[]} list - The current list of nodes (files/folders) to render.
 * @param {function} addNodeToList - Function to add a new node.
 * @param {function} deleteNodeFromList - Function to delete a node.
 */
const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  // State to track expanded folders. Use an object for individual control.
  // Keys are node IDs, values are boolean (true=expanded).
  const [isExpanded, setIsExpanded] = useState({});

  // --- Handlers ---
  /**
   * Toggles the expanded state for a given folder node ID.
   * @param {string} nodeId - The ID of the node to toggle.
   */
  const handleToggleExpand = (nodeId) => {
    setIsExpanded((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId], // Toggle the boolean value for the specific ID
    }));
  };

  /**
   * Handles adding a new node. Prompts for type (file/folder) and name,
   * then calls the parent function.
   * @param {Event} e - The click event object.
   * @param {string} parentId - The ID of the parent folder where the new node should be added.
   */
  const handleAddNode = (e, parentId) => {
    e.stopPropagation(); // Prevent toggle expand when clicking add icon

    // 1. Ask for type (file or folder)
    const typeInput = prompt("Enter type (file/folder):")?.toLowerCase();

    // Validate type input
    if (typeInput !== "file" && typeInput !== "folder") {
      alert("Invalid type. Please enter 'file' or 'folder'.");
      console.log("Add node cancelled: Invalid type.");
      return; // Stop if type is invalid
    }

    const isFolder = typeInput === "folder";

    // 2. Ask for name
    const name = prompt(`Enter Name for new ${typeInput}:`);

    // Proceed only if a name was entered
    if (name) {
      addNodeToList(parentId, name, isFolder); // Pass the determined type
    } else {
      console.log("Add node cancelled: No name entered.");
    }
  };

  /**
   * Handles deleting a node.
   * @param {Event} e - The click event object.
   * @param {string} nodeId - The ID of the node to delete.
   */
  const handleDeleteNode = (e, nodeId) => {
    e.stopPropagation(); // Prevent toggle expand when clicking delete icon
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteNodeFromList(nodeId);
    }
  };

  // --- Render Logic ---
  return (
    // Apply indentation for nested levels
    <div className="container">
      {list.map((node) => (
        // Each node needs a unique key for React's reconciliation
        <div key={node.id}>
          {/* Expand/Collapse Toggle (+/-) */}
          {node.isFolder && (
            <span onClick={() => handleToggleExpand(node.id)}>
              {isExpanded[node.id] ? "[-]" : "[+]"} {/* Use node.id as key */}
            </span>
          )}

          {/* Node Name (File/Folder) */}
          <span>
            {node.isFolder ? "📁" : "📄"} {node.name}
          </span>

          {/* Add Folder/File Button - Only show for folders */}
          {node.isFolder && (
            // Using simple text for buttons for clarity
            <button
              onClick={(e) => handleAddNode(e, node.id)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              + Add
            </button>
          )}

          {/* Delete Button - Show for all items */}
          <button
            onClick={(e) => handleDeleteNode(e, node.id)}
            style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
          >
            x Del
          </button>

          {/* Recursive Rendering of Children */}
          {/* Only render children if the node is a folder and is expanded */}
          {isExpanded[node.id] &&
            node.isFolder &&
            node.children &&
            node.children.length > 0 && (
              // IMPORTANT: Pass down the addNodeToList and deleteNodeFromList props recursively
              <List
                list={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
          {/* Optional: Message if folder is empty and expanded */}
          {isExpanded[node.id] &&
            node.isFolder &&
            (!node.children || node.children.length === 0) && (
              <div
                style={{
                  marginLeft: "20px",
                  fontStyle: "italic",
                  color: "grey",
                }}
              >
                (empty)
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

/**
 * Main App Component
 */
export default function App() {
  // State holding the entire file/folder tree structure
  const [data, setData] = useState(json); // Use initialData or your json import

  /**
   * Recursively adds a new node (file/folder) to the tree.
   * @param {string} parentId - The ID of the parent folder.
   * @param {string} name - The name for the new node.
   * @param {boolean} isFolder - Whether the new node is a folder.
   */
  const addNodeToList = (parentId, name, isFolder) => {
    // Generate a unique ID (using timestamp + random number for better uniqueness)
    const newNodeId =
      Date.now().toString() + Math.random().toString(36).substring(2, 7);
    // Create the new node based on the provided isFolder flag
    const newNode = {
      id: newNodeId,
      name,
      isFolder,
      children: isFolder ? [] : undefined,
    }; // Files don't have children array

    // Recursive function to traverse the tree and add the node
    const updateTree = (list) => {
      return list.map((node) => {
        // If we found the parent node
        if (node.id === parentId && node.isFolder) {
          // Ensure parent is a folder
          // Return the parent node with the new child added
          return {
            ...node,
            // Ensure children array exists before spreading
            children: [...(node.children || []), newNode],
          };
        }
        // If the current node has children, recursively search within them
        if (node.children && node.children.length > 0) {
          return { ...node, children: updateTree(node.children) };
        }
        // If it's not the parent and has no children to search, return the node unchanged
        return node;
      });
    };

    // Update the main data state with the modified tree
    setData((prevData) => updateTree(prevData));
  };

  /**
   * Recursively deletes a node from the tree by its ID.
   * @param {string} nodeIdToDelete - The ID of the node to remove.
   */
  const deleteNodeFromList = (nodeIdToDelete) => {
    // Recursive function to traverse the tree and filter out the node
    const updateTree = (list) => {
      // Filter out the node with the matching ID at the current level
      const filteredList = list.filter((node) => node.id !== nodeIdToDelete);

      // Recursively process the children of the remaining nodes
      return filteredList.map((node) => {
        if (node.children && node.children.length > 0) {
          // Return the node with its children potentially updated (if the deleted node was nested)
          return { ...node, children: updateTree(node.children) };
        }
        // If the node has no children, return it as is
        return node;
      });
    };

    // Update the main data state with the modified tree
    setData((prevData) => updateTree(prevData));
  };

  return (
    <div className="App">
      <h2>File / Folder Explorer</h2>
      {/* Render the List component with the data and the handler function */}
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}
