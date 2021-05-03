import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import createNewImage from "Editor/js/shapes/image/createNewImage";


export default function UploadedImage({ image, rmImage, popup }) {
    const changeImage = () => {
        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            const alt = g.getAttribute("alt");
            if (
                alt.includes("h1image|") ||
                alt == "slidetitleimage" ||
                alt == "newimage" || 
                alt == "image"
            ) {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectH1Image(session.CURRENT_SLIDE, shapeId, image);
                return;
            }
        }
    }

    const addImage = () => {

        const height = constants.SVG_HEIGHT() / 12 * 8;
        const image_ratio = image.width / image.height;
        const width = image_ratio * height;

        // Add new picture
        createNewImage({ image: image, width: width, height: height, keyword: "" });
    }

    return (
        <div className="col-6 text-center uploaded-image-container">
            <img onClick={popup ? changeImage : addImage} src={image.url} className="uploaded-image" />
            <span title="Delete" className="uploaded-image-delete" onClick={() => { rmImage(image) }}>
                <i className="fas fa-times"></i>
            </span>
        </div>
    );

}