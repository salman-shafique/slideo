import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import DownloadCard from "./DownloadCard";
import Header from "./Header";
import "./style.css";
import user from "../../../js/user";

let show = false;
export default function Download({ presentationId }) {
    const [downloadCards, setDownloadCards] = React.useState([]);

    const toggleFunc = () => {
        const elements = document.querySelector("#downloadCards").children;
        elements.forEach((element, i) => {
            if (i > 0) {
                element.style.display = show ? "" : "none";
            }
        });
        show = !show;
    }

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
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
            mounted.current = true;
        }
    });

    downloadCards.reverse();


    return (
        <>
            <h1 className="col-12 text-center" key={downloadCards.length + 1}>
                My Downloads
            </h1>
            <Header />
            <div id="downloadCards" className="col-12">
                {downloadCards}
            </div>

            {downloadCards.length >= 2
                ? <p key={"toggleBtn" + downloadCards.length} className="ml-4" style={{ cursor: "pointer" }} onClick={toggleFunc}>לחץ לצפייה בגרסאות קודמות</p>
                : ""
            }
            {user.userId
                ? ""
                : <h3 className="col-12 text-center">
                    Save your presentations for later!
                    <br />
                    <a href="/register">
                        <button className="btn btn-info mt-3">
                            <i className="fas fa-check-circle mr-2"></i>
                            Create free account
                        </button>
                    </a>
                </h3>
            }
        </>
    );
}
