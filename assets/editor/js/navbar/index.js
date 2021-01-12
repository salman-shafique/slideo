import "./status";
import React from "react";
import ReactDOM from "react-dom";
import SaveButton from "./SaveButton";
import DownloadButton from "./DownloadButton";
import PreviewButton from "./PreviewButton";

ReactDOM.render(<SaveButton />, document.getElementById("saveBtn"));
ReactDOM.render(<DownloadButton />, document.getElementById("downloadBtn"));
ReactDOM.render(<PreviewButton />, document.getElementById("PreviewBtn"));
