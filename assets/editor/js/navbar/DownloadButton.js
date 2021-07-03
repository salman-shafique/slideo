import React from "react";
import apiService from "Editor/js/utils/apiService";
import session from "Editor/js/session";
import { saveChanges } from "./SaveButton";
import preloader from "Editor/js/components/preloader";
import Modal from "Editor/js/components/Modal";
import toastr from "../components/toastr";
import Events from "../Events";

export default function DownloadButton() {
    const [numberOfSlides, setNumberOfSlides] = React.useState(0);
    const [state, setState] = React.useState(false);
    const [isPaid, setIsPaid] = React.useState(false);

    React.useEffect(() => {
        Events.listen("presentation.inited", () => {
            setState(!state);
            setIsPaid(session?.PRESENTATION?.checkout?.isCompleted);
        })
    }, [])

    const saveAndDownload = () => {
        preloader.show();
        saveChanges(() => {
            apiService({
                url: "/api/presentation/download/start/" + session.PRESENTATION.presentationId,
                data: { isPaid },
                success: (r) => {
                    if (!r.paymentRequired) {
                        $('#downloadModal').modal("show");
                        if (r.paidBefore)
                            toastr.success("You already paid for this presentation!")
                        window.open(`/editor/${session.PRESENTATION.presentationId}/download`, "_blank").focus();
                        preloader.hide();
                        return;
                    }

                    if (r.paymentUrl) {
                        window.open(r.paymentUrl, "_blank").focus();
                        preloader.hide();
                        setIsPaid(true);
                        return;
                    }
                }
            })
        });
    }

    const download = () => {
        setState(!state);
        if (session.PRESENTATION.slides.length > 5 && !isPaid) {
            $('#paymentModal').modal("show");
            setNumberOfSlides(session.PRESENTATION.slides.length);
            return;
        }
        saveAndDownload();
    }

    const closeModal = () => {
        $("#downloadModal, #paymentModal").modal("hide");
        setState(!state);
    }

    return (
        <>
            {
                session?.PRESENTATION?.checkout?.isCompleted
                    ? <span style=
                        {{
                            fontSize: "xx-small",
                            position: "absolute",
                            right: 0,
                            bottom: 0
                        }}
                    >You own this presentation</span>
                    : null
            }

            <button onClick={download} className="btn btn-danger bevel-btn horizontal-text-clip">
                <i className="fas fa-download mr-2"></i> הורד מצגת
            </button>
            <Modal id={"downloadModal"}>
                <img src="/img/party.gif" />
                <h3>הקובץ מיד יהיה זמין להורדה</h3>
                <p>תוכל למצוא אותו בעמוד המצגות שלך</p>
                <a href={"/editor/" + location.pathname.split("/").pop() + "/download"} target="_blank">
                    <button onClick={closeModal} className="btn btn-info">
                        <i className="fas fa-download mr-2"></i>
                        המצגות שלי
                    </button>
                </a>
            </Modal>
            <Modal id={"paymentModal"}>
                <h3>Download {numberOfSlides} Slides</h3>
                <p></p>
                <div>
                    <div>
                        <h5>Try a Sample</h5>
                        <p>Download Slides 1-5, PPTX Format</p>
                    </div>
                    <button onClick={() => {
                        closeModal();
                        saveAndDownload(false);
                    }} className="btn btn-secondary">
                        Free
                    </button>
                </div>

                <div>
                    <div>
                        <h5>Download Full PPTX</h5>
                        <p>Download all {numberOfSlides} Slides, PPTX Format</p>
                    </div>
                    <button onClick={() => {
                        closeModal();
                        saveAndDownload(true);
                    }} className="btn btn-info">
                        Pay $5
                    </button>
                </div>

            </Modal>
        </>
    );
}