import React from "react";
import ReactDOM from "react-dom";
import BackgroundPanel from "./BackgroundPanel";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import sidebar from "Editor/js/entity/sidebar";

ReactDOM.render(
    <BackgroundPanel />,
    document.getElementById("Background_Panel")
);

