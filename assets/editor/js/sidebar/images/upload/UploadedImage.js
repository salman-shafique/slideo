import React from "react";
import apiService from "Editor/js/utils/apiService";
import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";


const preloader_ = preloader();
export default function UploadedImage({ image, rmImage }) {

    return <div>
        {image.url}
        {/* <img src={image.url} /> */}
        <button onClick={() => { rmImage(image) }}>del</button>
    </div>;

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


    return (
        <div>
            <h1>{userImages.length} images</h1>
            <img className="upload-animation" src="/Images/download_anim.gif" />
            <h6 className="text-dark small-top-margin small-bottom-margin">Start adding Your Files</h6>
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