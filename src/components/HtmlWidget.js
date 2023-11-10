import React, { useState } from "react";

const HTMLWidget = ({ getWidget }) => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseEnter = (element) => {
    setHoveredElement(element);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const setWidget = (widget) => {
    getWidget(widget);
  };

  const widgetLabels = {
    div: "Insert a <div>",
    p: "Insert a paragraph",
    img: "Insert an image",
    a: "Insert a link",
    headings: "Insert a heading",
    ul: "Insert an unordered list",
    li: "Insert a list item",
    button: "Insert a button"
  };

  return (
    <div>
      <div className="widget">
        {Object.entries(widgetLabels).map(([element, label]) => (
          <button
            key={element}
            onClick={() => setWidget(`<${element}>`)}
            onMouseEnter={() => handleMouseEnter(element)}
            onMouseLeave={handleMouseLeave}
            style={{ margin: "2px" }} // Slight margin for visual spacing between buttons
          >
            &lt;{element}&gt;
          </button>
        ))}
      </div>
      <div
        style={{
          display: hoveredElement ? "block" : "none",
          borderLeft: "1px solid black",
          paddingLeft: "8px",
          marginTop: "8px"
        }}
      >
        {hoveredElement ? widgetLabels[hoveredElement] : ""}
      </div>
    </div>
  );
};

export default HTMLWidget;
