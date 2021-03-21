import React from "react";

export default function Modal({ id, children, show = false, large }) {

    React.useEffect(() => {
        $('#' + id).modal({
            show: show,
            focus: false
        });
    }, []);

    return (
        <div id={id} className="modal fade" role="dialog"
            style={{
                "backgroundColor": "rgba(255,255,255,0.8)"
            }} >
            <div className={"modal-dialog modal-dialog-centered " + (large ? "modal-lg" : "")} role="document">
                <div className="modal-content text-center" style={{ border: "none" }}>
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}