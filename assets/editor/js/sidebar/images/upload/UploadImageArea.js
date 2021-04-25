import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";
import UploadedImage from "./UploadedImage";



export default function UploadImageArea({ images }) {

    const [userImages, setUserImages] = React.useState([]);

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            setUserImages(images);
            mounted.current = true;
        }
    });

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
                    setUserImages(userImages.concat(r.addedImages))
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
        <div className="py-5 ">
            <div className="row m-0">
                {renderedImages}
            </div>
            <img className="upload-animation" src="/Images/download_anim.gif" />
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
    )



}