// Add event listeners
import "./resize";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";


let panel = document.getElementById('MainPanel');

panel.onclick = function () {
    deSelectAll()
}
// TextEditorPopup
// IconPopup
// ImagePopup
//     popup[i].addEventListener("click", function (ev) {
//         ev.stopPropagation();
//     }, false);


// for(var i = 0; popup[i]; i++){
//     popup[i].addEventListener("click", function (ev) {
//         ev.stopPropagation();
//     }, false);
// }
    

// popup.onclick = function () {
//     // deSelectAll()
// }
