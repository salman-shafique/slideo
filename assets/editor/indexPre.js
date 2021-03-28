import React from "react";
import ReactDom from "react-dom";
import Modal from './js/components/Modal.js';

// Bootstrap JS
import '../js/bootstrap.bundle.min.js';

// Entry - Modal and editor functions
// Analyze users content
import "Editor/js/entry";

// Preloader
import preloader from "Editor/js/components/preloader";

ReactDom.render(
    <Modal show large id="buttons_modal" >
        <div id="Action_Container" className="py-5">
            <div className="flows-container row m-0">
                <div className="flow-item col-4">
                    <div className="encloser">
                        <div className="fully-centered-flow py-3" style={{ backgroundColor: "rgb(213, 76, 40)" }}>
                            <img className="buttons_modal_img" src="/img/entry-buttons/plus3.png" />
                        </div>
                        <button className="btn text-center w-100 mt-1 text-white" style={{ backgroundColor: "rgb(213, 76, 40)" }}>העלאת מצגת PPTX</button>
                        <div className="action-caption">
                            <p className="action-premium text-center"><i className="fas fa-crown"></i>  חשבון פרימיום</p>
                        </div>
                    </div>
                </div>
                <div className="flow-item col-4">
                    <div className="encloser">
                        <div className="fully-centered-flow py-3" style={{ backgroundColor: "rgb(47, 85, 150)" }}>
                            <img className="buttons_modal_img" src="/img/entry-buttons/template3.png" />
                        </div>
                        <button className="btn text-center w-100 mt-1 text-white" style={{ backgroundColor: "rgb(47, 85, 150)" }}>העלאת מסמך DOCX</button>
                        <div className="action-caption">
                            <p className="action-premium text-center"><i className="fas fa-crown"></i>  חשבון פרימיום</p>
                        </div>
                    </div>
                </div>
                <div className="flow-item col-4" data-dismiss="modal">
                    <div className="encloser">
                        <div className="fully-centered-flow py-3" style={{ backgroundColor: "rgb(0, 153, 203)" }}>
                            <img className="buttons_modal_img" src="/img/entry-buttons/import3.png" />
                        </div>
                        <button className="btn text-center w-100 mt-1 text-white" style={{ backgroundColor: "rgb(0, 153, 203)" }}>כתוב או הדבק טקסט</button>
                        <div className="action-caption">
                            <p className="action-premium text-center" style={{ visibility: "hidden" }}><i className="fas fa-crown" style={{ visibility: "hidden" }}></i>  חשבון פרימיום</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    , document.getElementById('buttons_modal_container')
);


(function () {
    preloader.hide();
})()


