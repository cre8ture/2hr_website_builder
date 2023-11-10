import React, { useEffect, useState } from "react";

const LiveHTMLPreview = ({ code }) => {
  return (
    <div>
      <h2>Live HTML Preview</h2>
      <div className="preview" dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
};

export default LiveHTMLPreview;
