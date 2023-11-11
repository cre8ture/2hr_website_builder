import React, { useState, useContext } from "react";
// import { useSelector } from "react-redux";
// import { updateHtmlCode } from "../redux/actions/htmlCodeActions";
import { CodeContext } from "../contexts/CodeContext";

const TopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("My Website");
  const { code, setCode } = useContext(CodeContext);
  // Retrieve the HTML code from the Redux store
  // const htmlCode = useSelector((state) => state.htmlCodeReducer.htmlCode);

  const downloadHtmlFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = newTitle + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const biggerText = () => {
    const editor = document.querySelector(".editor");
    if (editor) {
      const currentFontSize = window
        .getComputedStyle(editor, null)
        .getPropertyValue("font-size");
      const newSize = parseInt(currentFontSize) + 2; // Increase font size by 2px
      editor.style.fontSize = `${newSize}px`;
    }
  };

  const smallerText = () => {
    const editor = document.querySelector(".editor");
    if (editor) {
      const currentFontSize = window
        .getComputedStyle(editor, null)
        .getPropertyValue("font-size");
      const newSize = parseInt(currentFontSize) - 2; // Decrease font size by 2px
      editor.style.fontSize = `${newSize}px`;
    }
  };

  return (
    <div className="navbar">
      <div
        className="navbar-container"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleSaveClick}
              autoFocus
            />
          ) : (
            <>
              <h1>{newTitle}</h1>
              <span
                role="img"
                aria-label="Edit"
                onClick={handleEditClick}
                style={{
                  fontSize: "10px",
                  paddingTop: "15px",
                  cursor: "pointer",
                  marginLeft: "5px", // Added margin for spacing
                  transformOrigin: "center",
                  transition: "transform 0.2s"
                }}
              >
                ✏️
              </span>
            </>
          )}
        </div>
        <div className="menu-icon" onClick={toggleDropdown}>
          ☰
        </div>
        <div className={`dropdown ${isDropdownOpen ? "active" : ""}`}>
          <a href="/" className="dropdown-item" onClick={downloadHtmlFile}>
            Download
          </a>
          <a href="/" className="dropdown-item" onClick={biggerText}>
            Bigger text
          </a>
          <a href="/" className="dropdown-item" onClick={smallerText}>
            Smaller text
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
