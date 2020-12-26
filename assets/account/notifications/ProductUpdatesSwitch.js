import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";


export default function ProductUpdatesSwitch({ isActive }) {

    const updateServer = (e) => {
        apiService({
            "url": "/api/account/notifications/productUpdates",
            "data": {
                "productUpdates": e.target.checked
            }
        })
    }

    const id = parseInt(Math.random() * 1000);
    return (
        <div className="custom-control custom-switch">
            <input onChange={updateServer} type="checkbox" className="custom-control-input" defaultChecked={isActive} id={"switch" + id} />
            <label className="custom-control-label" htmlFor={"switch" + id}></label>
        </div>
    )
}