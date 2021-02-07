import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import DownloadCard from "./DownloadCard";
import Header from "./Header";
import "./style.css";


let show = false;
export default function Download({ presentationId }) {
    const [downloadCards, setDownloadCards] = React.useState([]);

    const toggleFunc = () => {
        const elements = document.querySelector("#downloadArea").children;
        elements.forEach((element, i) => {
            if (i > 2 && element.tagName != "P") {
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

    const startNewDownload = () => {
        preloader.show();
        apiService({
            url: "/api/presentation/download/start/" + presentationId,
            success: (r) => {
                if (r.success)
                    location.reload();
            }
        })
    }

    downloadCards.push(<Header key={downloadCards.length + 1} />);
    downloadCards.push(
        <h1 className="col-12 text-center" key={downloadCards.length + 1}>
            <button onClick={startNewDownload} className="btn btn-info">התחל הורדה חדשה</button>
        </h1>
    )
    downloadCards.reverse();

    if (downloadCards.length >= 4)
        downloadCards.push(<p key={"toggleBtn" + downloadCards.length} className="ml-4" style={{ cursor: "pointer" }} onClick={toggleFunc}>לחץ לצפייה בגרסאות קודמות</p>)

    return downloadCards;
}
