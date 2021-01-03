import React from "react";
import apiService from "Editor/js/utils/apiService";
import session from "Editor/js/session";
import { saveChanges } from "./SaveButton";

const download = () => {
    saveChanges(() => {
        apiService({
            url: "/api/presentation/download/start/" + session.PRESENTATION.presentationId,
            success: (r) => {
                if (r.success) {
                    Object.assign(document.createElement('a'), { target: '_blank', href: "/editor/" + session.PRESENTATION.presentationId + "/download"}).click();
                }
            }
        })
    });
}

export default function DownloadButton() {
    return (
        <button onClick={download} className="btn btn-danger bevel-btn horizontal-text-clip">
            <i className="fas fa-download"></i> הורדה
        </button>
    )
}