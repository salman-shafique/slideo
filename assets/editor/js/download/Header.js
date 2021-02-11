import React from "react";

export default function Header() {


    return (
        <div className="col-12 mb-3 d-none d-sm-block">
            <div className="row m-0">
                <div className="col-1 d-flex justify-content-center align-items-center"></div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center">שקפים</div>
                <div className="col-2 d-flex justify-content-center align-items-center">תאריך בקשת הורדה</div>
                <div className="col-1 d-flex justify-content-center align-items-center">
                    מחיר
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    PDF
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    PPTX
                </div>
            </div>
        </div>
    )
}