import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";

const Confetti = () => {
    const rmModal = () => {
        document.getElementById("confettiModal").remove();
    }
    return (
        <div id="confettiModal" className="modal fade show" role="dialog"
            style={{
                "display": "block",
                "backgroundColor": "rgba(255,255,255,0.8)"
            }} >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content text-center" style={{ border: "none" }}>
                    <div className="modal-body">
                        <img src="/img/confetti.gif" />
                        <h3>Congratulations!</h3>
                        <h4>Your presentation is ready!</h4>
                        <button className="btn" onClick={rmModal}>
                            Continue creating
                            <i className="ml-2 fas fa-arrow-circle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

(function () {
    if (window.localStorage.confettiShowed) return;

    let timeout = setInterval(() => {
        try {
            if (session.PRESENTATION.slides.length == 1) {
                window.localStorage.confettiShowed = "true";

                const div = document.createElement("div");
                document.body.appendChild(div);

                ReactDOM.render(
                    <Confetti />, div
                )
                clearInterval(timeout);
            } else {
                clearInterval(timeout);
            }
        } catch { }
    }, 100)
})()