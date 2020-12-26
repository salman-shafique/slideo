import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";


export default function BrowserNotificationsSwitch({ isActive }) {

    const updateServer = (val) => {
        apiService({
            "url": "/api/account/notifications/browserNotifications",
            "data": {
                "browserNotifications": val
            }
        })
    }
    const browserNotifications = (e) => {
        if (e.target.checked) {
            Notification.requestPermission().then((r) => {
                if (r == "granted") {
                    const title = 'Notifications are enabled';
                    const options = {
                        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
                        icon: '/favicon/favicon-128.png',
                        body: "We will inform you know about updates about you."
                    };
                    new Notification(title, options);
                    updateServer(true);
                } else {
                    toastr.error("Please allow notifications from our site in your browser settings.");
                    e.target.checked = false;
                    updateServer(false);
                }
            });
        } else {
            updateServer(false);
        }

    }
    const id = parseInt(Math.random() * 1000);
    return (
        <div className="custom-control custom-switch">
            <input onChange={browserNotifications} type="checkbox" className="custom-control-input" defaultChecked={isActive} id={"switch" + id} />
            <label className="custom-control-label" htmlFor={"switch" + id}></label>
        </div>
    )
}