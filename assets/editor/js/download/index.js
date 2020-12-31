import React from "react";
import ReactDOM from "react-dom";
import Download from "./Download";

const downloadArea = document.getElementById("downloadArea");
const presentationId = downloadArea.getAttribute("presentationid");

ReactDOM.render(<Download presentationId={presentationId} />, downloadArea);
