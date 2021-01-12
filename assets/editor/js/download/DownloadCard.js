import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";


export default function DownloadCard({ downloadCardDetail, presentationId, check = false }) {

    if (check && !downloadCardDetail.completed)
        setInterval(() => {
            apiService({
                url: "/api/presentation/download/get/" + presentationId + "/" + downloadCardDetail.id,
                success: (latestDownloadCardDetail) => {
                    if (latestDownloadCardDetail.pptxFile != downloadCardDetail.pptxFile ||
                        latestDownloadCardDetail.pdfFile != downloadCardDetail.pdfFile ||
                        latestDownloadCardDetail.prevFile != downloadCardDetail.prevFile
                    ) {
                        preloader().show();
                        location.reload();
                    }
                }
            });
        }, 5000);

    const pptxButton = downloadCardDetail.pptxFile ?
        <a href={downloadCardDetail.pptxFile} target="_blank">
            <button className={"btn btn-danger"}>PPTX</button>
        </a> :
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>

    const pdfButton = downloadCardDetail.pdfFile ?
        <a href={downloadCardDetail.pdfFile} target="_blank">
            <button className={"btn btn-info"}>PDF</button>
        </a> :
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>

    const imgSrc = downloadCardDetail.prevFile ?
        downloadCardDetail.prevFile :
        "/favicon/favicon-196x196.png";


    return (
        <div className="col-12 my-3 py-3 border">
            <div className="row m-0">
                <div className="col-1 d-flex justify-content-center align-items-center mt-0"></div>
                <div downloadid={downloadCardDetail.id} className="col-12 col-sm-3 d-flex justify-content-center align-items-center mt-0">
                    <img style={{ maxHeight: "100px" }} src={imgSrc} />
                </div>
                <div className="col-1 col-sm-1 d-flex justify-content-center align-items-center mt-0">{downloadCardDetail.numberOfSlides}</div>
                <div className="col-4 col-sm-2 d-flex justify-content-center align-items-center mt-0">{downloadCardDetail.created.date.slice(0, -10)}</div>
                <div className="col-1 col-sm-1 d-flex justify-content-center align-items-center mt-0">
                    <span className="badge badge-success">Free</span>
                </div>
                <div className="col-3 col-sm-2 d-flex justify-content-center align-items-center mt-0">
                    {pdfButton}
                </div>
                <div className="col-3 col-sm-2 d-flex justify-content-center align-items-center mt-0">
                    {pptxButton}
                </div>
            </div>
        </div>
    )
}