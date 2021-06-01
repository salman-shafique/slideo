// Add event listeners
import "./resize";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";


let panel = document.getElementById('MainPanel');

panel.onclick = function () {
    deSelectAll()
}
