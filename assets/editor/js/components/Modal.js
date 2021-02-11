import React from "react";

export default function Modal({ id, children }) {

    React.useEffect(() => {
        $('#' + id).modal({
            show: false,
            focus: false
        });
    }, []);

    return (
        <div id={id} className="modal fade" role="dialog"
            style={{
                "backgroundColor": "rgba(255,255,255,0.8)"
            }} >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content text-center" style={{ border: "none" }}>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}