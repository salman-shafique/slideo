import React from "react";
import ReactDOM from "react-dom";
import DesignsPanel from "./DesignsPanel";
import select from "Editor/js/utils/selector/select";


const designsPanel = <DesignsPanel />        
ReactDOM.render(designsPanel,select("#Design_Panel"))
