import React from "react";
import apiService from "Editor/js/utils/apiService";
import session from "Editor/js/session";
import { saveChanges } from "./SaveButton";
import preloader from "Editor/js/components/preloader";
import Modal from "Editor/js/components/Modal";

export default function DownloadButton() {


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

    const closeModal = () => {
        $("#downloadModal").modal("hide");
    }

    return (
        <>
            <button onClick={download} className="btn btn-danger bevel-btn horizontal-text-clip">
                <i className="fas fa-download mr-2"></i>  הורדת מצגת
            </button>
            <Modal id={"downloadModal"}>
                <img src="/img/party.gif" />
                <h3>Congratulations!</h3>
                <h4>Your presentation is ready!</h4>
                <a href={"/editor/" + location.pathname.split("/").pop() + "/download"} target="_blank">
                    <button onClick={closeModal} className="btn btn-info">
                        <i className="fas fa-download mr-2"></i>
                        Go to downloads page
                    </button>
                </a>
            </Modal>
        </>
    );
}