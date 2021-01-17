import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";
import UploadedImage from "./UploadedImage";


const preloader_ = preloader();
export default function UploadImageArea({ images }) {

    const [userImages, setUserImages] = React.useState([]);

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            setUserImages(images);
            mounted.current = true;
        }
    });
    ///api/editor/image/upload

    const upload = (e) => {
        const input = e.target;
        if (input.files.length == 0) return;

        preloader_.show();
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
                    setUserImages(userImages.concat(r.addedImages))
                } else {
                    toastr.error(r.descr, "Oops");
                }
                preloader_.hide();
                input.value = "";
            }
        });

    }

    const rmImage = (image) => {
        apiService({
            url: "/api/editor/image/userimages/delete/" + image.id,
        });
        image.isActive = false;
        setUserImages(userImages.filter((e) => e.isActive));
    }

    const renderedImages = [];
    if (userImages.length > 0)
        userImages.forEach((image, i) => {
            if (image.isActive)
                renderedImages.push(
                    <UploadedImage image={image} key={i} rmImage={rmImage} />
                )
        });

    return (
        <div>
            <div className="row m-0 py-4">
                {renderedImages}
            </div>

            <img className="upload-animation" src="/Images/download_anim.gif" />
            <p className="text-dark">Upload files from your Computer<br />5 mb per image</p>
            <input multiple id="userImageUploadInput" onChange={upload} className="d-none" type="file" accept="image/*" />
            <button onClick={() => {
                document.getElementById("userImageUploadInput").click();
            }}
                id="UploadFirstCustomImage"
                className="btn btn-primary btn-sm default-button horizontal-text-clip">
                UPLOAD MEDIA
            </button>
        </div>
    )



}