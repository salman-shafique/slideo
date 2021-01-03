import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import DownloadCard from "./DownloadCard";



export default function Download({ presentationId }) {
    const [downloadCards, setDownloadCards] = React.useState([]);

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            apiService({
                url: "/api/presentation/download/get/" + presentationId,
                success: (downloadPresentations) => {
                    if (downloadPresentations.length > 0) {
                        const tmp = [];
                        downloadPresentations.forEach(downloadCardDetail => {
                            tmp.push(
                                <DownloadCard
                                    downloadCardDetail={downloadCardDetail}
                                    key={downloadCardDetail.id} />
                            );
                        });
                        setDownloadCards(tmp);
                    }
                    preloader().hide();
                }
            });
            mounted.current = true;
        }
    });

    const startNewDownload = () => {
        preloader().show();
        apiService({
            url: "/api/presentation/download/start/" + presentationId,
            success: (r) => {
                if (r.success)
                    location.reload();
            }
        })
    }
    downloadCards.push(
        <>
            <h1 className="col-12 text-center" key={0}>
                <button onClick={startNewDownload} className="btn btn-info">התחל הורדה חדשה</button>
            </h1>
        </>
    )
    downloadCards.reverse();

    return downloadCards;
}
