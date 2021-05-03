import React, { useEffect } from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";
import UploadedImage from "./UploadedImage";
import Events from "Editor/js/Events";


export default function UploadImageArea({ images, popup }) {
    const [userImages, setUserImages] = React.useState([...images]);

    useEffect(() => {
        Events.listen('popup.image.upload', (e) => {           
            setUserImages(e.data.images);
        });

        Events.listen('popup.image.delete', (e) => {           
            setUserImages(e.data.images);
        });
    }, [images]);

    useEffect(() => {
        setUserImages([...images]);
    }, [images]);    

    const upload = (e) => {
        const input = e.target;
        if (input.files.length == 0) return;

        preloader.show();
        const data = new FormData();

        input.files.forEach(file => {
            data.append('images[]', file, file.name);
        });

        apiService({
            url: "/api/editor/image/upload",
            data: data,
            processData: false, // to upload blob image
            contentType: false, // to upload blob image
            success: (r) => {
                if (r.success) {
                    Events.popup.image.upload({ images: userImages.concat(r.addedImages) });
                } else {
                    toastr.error(r.descr, "Oops");
                }
                preloader.hide();
                input.value = "";
            }
        });

    }

    const rmImage = (image) => {
        apiService({
            url: "/api/editor/image/userimages/delete/" + image.id,
        });
        image.isActive = false;
        Events.popup.image.delete({ images: userImages.filter((e) => e.isActive) });
    }

    const renderedImages = [];
    if (userImages.length > 0)
        userImages.forEach((image, i) => {
            if (image.isActive)
                renderedImages.push(
                    <UploadedImage image={image} key={i} rmImage={rmImage} popup={ popup } />
                )
        });

    return (
        <div className={`${ renderedImages.length ? 'custom-scrollbar vertical-scroll' : 'd-flex flex-column justify-content-center align-items-center'}`}>
            <div className="row m-0">
                {renderedImages}
            </div>
            {
                !renderedImages.length ?
                <img className="upload-animation" src="/Images/download_anim.gif" /> : undefined
            }
            <div className="uploadimagesfixed">
                <p className="text-dark">העלאת תמונות מהמחשב שלך<br />(5mb עד גודל של)</p>
                <input multiple id="userImageUploadInput" onChange={upload} className="d-none" type="file" accept=".BMP,.GIF,.JPG,.JPEG,.PNG,.TIFF,.WMF" />
                <button onClick={() => {
                    document.getElementById("userImageUploadInput").click();
                }}
                    id="UploadFirstCustomImage"
                    className="btn btn-primary btn-sm default-button horizontal-text-clip">
                    בחירת תמונות
                </button>
            </div>
        </div>
    )



}