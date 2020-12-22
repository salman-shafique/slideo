import Toastr from "Editor/js/dependencies/toastr.min.js";
import "Editor/css//toastr.css";

Toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const toastr = {
    success: (text, title = null, callback = null) => {
        Toastr.options.onHidden = callback;
        Toastr.success(text, title);
        Toastr.options.onHidden = null;
    },
    error: (text, title = null, callback = null) => {
        Toastr.options.onHidden = callback;
        Toastr.error(text, title);
        Toastr.options.onHidden = null;
    },
    info: (text, title = null, callback = null) => {
        Toastr.options.onHidden = callback;
        Toastr.info(text, title);
        Toastr.options.onHidden = null;
    },
    warning: (text, title = null, callback = null) => {
        Toastr.options.onHidden = callback;
        Toastr.warning(text, title);
        Toastr.options.onHidden = null;
    }

}
export default toastr;

