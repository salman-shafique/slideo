import toastr from "Editor/js/components/toastr";
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

// Confetti
import "Editor/js/components/Confetti";


window.onerror = (r)=>{
    preloader().forceHide();
    toastr.error("OOps... Something went wrong on our side...");
    console.error(r);
}

// Enable close tab warning
window.onbeforeunload = () => "";

