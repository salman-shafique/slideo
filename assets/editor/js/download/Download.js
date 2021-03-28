import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import DownloadCard from "./DownloadCard";
import Header from "./Header";
import "./style.css";
import user from "../../../js/user";
import Modal from "Editor/js/components/Modal";



let show = false;
export default function Download({ presentationId }) {
    const [downloadCards, setDownloadCards] = React.useState([]);
    const [nextPageHref, setNextPageHref] = React.useState("/");

    const toggleFunc = () => {
        const elements = document.querySelector("#downloadCards").children;
        elements.forEach((element, i) => {
            if (i > 0) {
                element.style.display = show ? "" : "none";
            }
        });
        show = !show;
    }

    React.useEffect(() => {
        if (!user.userId) {
            // Disable all links
            const linksInPage = document.querySelectorAll("a[href]:not(.continue)");
            linksInPage.forEach(link => {
                link.onclick = (event) => {
                    let nextLink;
                    event.path.forEach(path => {
                        if (path.tagName == "A")
                            if (path.getAttribute("href") && !nextLink)
                                nextLink = path.getAttribute("href");
                    });
                    if (nextLink) {
                        if (!["/login", "/register"].includes(nextLink)) {
                            event.preventDefault();
                            $('#downloadAlertModal').modal("show");
                            setNextPageHref(nextLink);
                        }
                    }
                }
            });
        }
        // Get download history
        apiService({
            url: "/api/presentation/download/get/" + presentationId,
            success: (downloadPresentations) => {
                if (downloadPresentations.length > 0) {
                    const tmp = [];
                    let check = false;
                    downloadPresentations.forEach((downloadCardDetail, i) => {
                        tmp.push(
                            <DownloadCard
                                downloadCardDetail={downloadCardDetail}
                                presentationId={presentationId}
                                key={i}
                                check={!downloadCardDetail.completed && !check} />
                        );
                        if (!downloadCardDetail.completed && !check)
                            check = true;
                    });
                    setDownloadCards(tmp);
                    toggleFunc();
                }
                preloader.hide();
            }
        });
    }, []);

    downloadCards.reverse();


    return (
        <>
            <h1 className="col-12 text-center" key={downloadCards.length + 1}>
                הורדת מצגות
            </h1>
            <Header />
            <div id="downloadCards" className="col-12">
                {downloadCards}
            </div>

            {downloadCards.length >= 2
                ? <p key={"toggleBtn" + downloadCards.length} className="ml-4" style={{ cursor: "pointer" }} onClick={toggleFunc}>לחץ לצפייה בגרסאות קודמות</p>
                : ""
            }
            <p class="col text-right"></p>
            {user.userId
                ? ""
                :
                <>
                    <h3 className="col-12 text-center">
                    רוצה לשמור את המצגות שלך?
                    <br />
                        <a href="/register">
                            <button className="btn btn-info mt-3">
                            פתח חשבון חינם
                                <i className="fas fa-check-circle mr-2"></i>
                            </button>
                        </a>
                    </h3>

                    <Modal id={"downloadAlertModal"}>
                        <div>
                            <h2 className="my-5">Wait!</h2>
                            <h3 className="mb-5">Leaving this page can <br />DELETE your presentation</h3>
                            <h4 className="col-12 text-center">
                                Save your presentations for later!
                                <br />
                                <a href="/register">
                                    <button className="btn btn-info mt-3">
                                        <i className="fas fa-check-circle mr-2"></i>
                                        Save your presentations
                                    </button>
                                </a>
                            </h4>
                            <a href={nextPageHref} className="continue">
                                <p style={{ textDecoration: "underline" }}>
                                    Continue and do not save presentation
                        </p>
                            </a>
                        </div>
                    </Modal>
                </>
            }
        </>
    );
}
