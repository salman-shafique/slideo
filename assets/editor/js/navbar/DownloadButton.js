import React from "react";
import apiService from "Editor/js/utils/apiService";
import session from "Editor/js/session";
import { saveChanges } from "./SaveButton";
import toastr from "Editor/js/components/toastr";
import reactToDOM from "Editor/js/utils/reactToDOM";

export default function DownloadButton() {
    const download = () => {
        saveChanges(() => {
            apiService({
                url: "/api/presentation/download/start/" + session.PRESENTATION.presentationId,
                success: (r) => {
                    if (r.success) {
                        const alertBox = reactToDOM(
                            <a
                                href={"/editor/" + session.PRESENTATION.presentationId + "/download"}
                                target="_blank"
                                className="rtl"
                                >
                                ההורדה שלך עומדת בתור. לחץ כאן לצפייה בדף ההורדות.
                            </a>
                        );
                        toastr.info(alertBox);
                    }
                }
            })
        });
    }


    return (
        <button onClick={download} className="btn btn-danger bevel-btn horizontal-text-clip">
            <i className="fas fa-download mr-2"></i> הורדה
        </button>
    );
}