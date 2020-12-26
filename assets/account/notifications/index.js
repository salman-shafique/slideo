import React from "react";
import ReactDOM from "react-dom";
import BrowserNotificationsSwitch from "./BrowserNotificationsSwitch";
import ProductUpdatesSwitch from "./ProductUpdatesSwitch";


const browserNotificationsEl = document.getElementById("account-notification-browser");
let isActive = browserNotificationsEl.getAttribute("browser-notifications");

ReactDOM.render(
    <BrowserNotificationsSwitch isActive={Boolean(isActive)} />, browserNotificationsEl
)


const productUpdatesEl = document.getElementById("account-notification-product-updates");
isActive = productUpdatesEl.getAttribute("product-updates");

ReactDOM.render(
    <ProductUpdatesSwitch isActive={Boolean(isActive)} />, productUpdatesEl
)
