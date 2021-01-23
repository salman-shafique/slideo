import "Editor/css/preloader.css";

const preloaderEl = document.querySelector(".preloader-container");

let registeredEvents = 0;
function preloaderClass() {
    if (!(this instanceof preloaderClass)) return new preloaderClass(...arguments);
    this.show = () => {
        registeredEvents++;
        if (preloaderEl.classList.contains("d-none")) {
            preloaderEl.classList.remove("d-none");
            preloaderEl.classList.add("d-flex");
        }
    }
    this.hide = () => {
        registeredEvents--;
        if (registeredEvents <= 0) {
            preloaderEl.classList.remove("d-flex");
            preloaderEl.classList.add("d-none");
        }
    }
    this.forceHide = () => {
        registeredEvents = 0;
        preloaderEl.classList.remove("d-flex");
        preloaderEl.classList.add("d-none");
    }

}

const preloader = preloaderClass();

export default preloader;