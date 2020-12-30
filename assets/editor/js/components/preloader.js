import "Editor/css/preloader.css";

const preloaderEl = document.querySelector(".preloader-container");

let registeredEvents = 0;
export default function preloader() {
    if (!(this instanceof preloader)) return new preloader(...arguments);
    this.show = () => {
        registeredEvents++;
        if (preloaderEl.classList.contains("d-none")) {
            preloaderEl.classList.remove("d-none");
            preloaderEl.classList.add("d-flex");
            $(preloaderEl).fadeIn('slow');
        }
    }
    this.hide = () => {
        registeredEvents--;
        if (registeredEvents <= 0) {
            $(preloaderEl).fadeOut('slow', function () {
                this.classList.remove("d-flex");
                this.classList.add("d-none");
            });
        }
    }
    this.forceHide = () => {
        registeredEvents = 0;
        $(preloaderEl).fadeOut('slow', function () {
            this.classList.remove("d-flex");
            this.classList.add("d-none");
        });
    }

}