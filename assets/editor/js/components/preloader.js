import "Editor/css/preloader.css";

let registeredEvents = 0;
function preloaderClass() {
    if (!(this instanceof preloaderClass)) return new preloaderClass(...arguments);
    const preloaderEl = document.querySelector(".preloader-container");
    this.show = () => {
        registeredEvents++;
        if (preloaderEl.classList.contains("d-none")) {
            preloaderEl.classList.add("d-flex");
            preloaderEl.classList.remove("d-none");
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