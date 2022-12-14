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

// Save Changes
// import "Editor/js/slides/saveChanges";

// Save Content
import "Editor/js/slides/saveContent";

// Save Color Template
import "Editor/js/slides/saveColorTemplate";

// Save Background
import "Editor/js/slides/saveBackground";

// Save Style
import "Editor/js/slides/saveStyle";

// Save Transform
import "Editor/js/slides/saveTransform";

// Save Thumbnail
import "Editor/js/slides/saveThumbnail";

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




