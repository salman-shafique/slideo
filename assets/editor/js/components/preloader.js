
const preloaderEl = document.querySelector(".preloader-container");

let registeredEvents=[];
export default function preloader() {
    if (!(this instanceof preloader)) return new preloader(...arguments);

    this.register = () => {
        registeredEvents.push("alp");
        console.log(preloaderEl, registeredEvents);
    }

    this.show = () => {
        preloaderEl.classList.remove("d-none");
        preloaderEl.classList.add("d-flex");
        $(preloaderEl).fadeIn('slow');
    }
    this.hide = () => {
        $(preloaderEl).fadeOut('slow', function () {
            this.classList.remove("d-flex");
            this.classList.add("d-none");
        });
    }

}