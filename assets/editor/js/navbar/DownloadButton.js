import React from "react";
import apiService from "Editor/js/utils/apiService";
import session from "Editor/js/session";
import { saveChanges } from "./SaveButton";
import preloader from "Editor/js/components/preloader";
import reactToDOM from "Editor/js/utils/reactToDOM";

export default function DownloadButton() {

    React.useEffect(() => {
        $('#downloadModal').modal({
            show: false,
            focus: false
        });
    }, []);

    const download = () => {
        preloader.show();
        saveChanges(() => {
            apiService({
                url: "/api/presentation/download/start/" + session.PRESENTATION.presentationId,
                success: (r) => {
                    if (r.success) {
                        $('#downloadModal').modal("show");
                    }
                    preloader.hide();
                }
            })
        });
    }


    return (
        <>
            <button onClick={download} className="btn btn-danger bevel-btn horizontal-text-clip">
                <i className="fas fa-download mr-2"></i> הורדה
            </button>
            <div id="downloadModal" className="modal fade" role="dialog"
                style={{
                    "backgroundColor": "rgba(255,255,255,0.8)"
                }} >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center" style={{ border: "none" }}>
                        <div className="modal-body">
                            <img src="/img/party.gif" />
                            <h3>Congratulations!</h3>
                            <h4>Your presentation is queued!</h4>
                            <a href={"/editor/" + location.pathname.split("/").pop() + "/download"} target="_blank">
                                <button className="btn btn-info">
                                    <i className="fas fa-download mr-2"></i>
                                    Go to downloads page
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}