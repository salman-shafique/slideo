import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";


export default function DownloadCard({ downloadCardDetail }) {



    return (
        <div className="col-12 mb-3">
            <div className="row m-0">
                <div className="col-1 d-flex justify-content-center align-items-center">#{downloadCardDetail.id}</div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <img src={"https://dummyimage.com/150x100/808080/ffffff&text=Slideo"} />
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">{downloadCardDetail.numberOfSlides}</div>
                <div className="col-2 d-flex justify-content-center align-items-center">{downloadCardDetail.created.date.slice(0, -10)}</div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    <span className="badge badge-success">Free</span>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div></div>
                <div></div>
            </div>
        </div>


    )


}