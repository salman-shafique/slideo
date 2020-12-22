import React from "react";
import ReactDOM from "react-dom";

const preloaderEl = document.createElement("div");
preloaderEl.classList.add("preloader-container");
ReactDOM.render(
    <div className="spinner-border preloader" role="status">
        <span className="sr-only">Loading...</span>
    </div>, preloaderEl)
document.body.appendChild(preloaderEl);

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