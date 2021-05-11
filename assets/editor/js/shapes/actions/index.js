// Add event listeners
import "./resize";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";

//
// window.top.document.body.onclick = () => {
//     // deSelectAll()
// }
//
document.getElementById('MainPanel').onclick = function () {
    deSelectAll()
}
