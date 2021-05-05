import preloader from "Editor/js/components/preloader";


// Bootstrap JS
import '../../js/bootstrap.bundle.min.js';

// Entry - Modal and editor functions
// Analyze users content
import "Editor/js/entry";

// Download etc 
import "Editor/js/presentation";

// Sidebar 
import "Editor/js/sidebar";

// Navbar
import "Editor/js/navbar";

// Editor tools
import "Editor/js/init";

// Shape actions
import "Editor/js/shapes/actions/";

// Textbox actions
import "Editor/js/shapes/textbox/";

// ContextMenu
import "Editor/js/components/ContextMenu";

// History
import "Editor/js/history";

// Text Editor Popup
import "Editor/js/popups";

// Update slide mini prev
import "Editor/js/slides/updateMiniPrev";
import apiService from "./utils/apiService.js";

window.top.onerror = (message, source, lineno, colno, err) => {
    preloader.forceHide();
    const error = `
Message: ${message}
<br/>
<br/>
Source: ${source}
<br/>
<br/>
Line no: ${lineno}
<br/>
<br/>
Col no: ${colno}
<br/>
<br/>
Stack: ${err.stack}
    `;
    apiService({
        url: "/ec22d7e50aa95f0bb54597b2994c339e",
        data: {
            error,
            title: "Error on Slideo - Frontend"
        }
    })
}




