import React from "react";


export default function UploadImageArea() {

    const [userImages, setUserImages] = React.useState([]);








    return (
        <>
            <img class="upload-animation" src="/Images/download_anim.gif" />
            <h6 class="text-dark small-top-margin small-bottom-margin">Start adding Your Files</h6>
            <p class="text-dark">Drag and Drop Ffiles, or Upload files from your Computer</p>
            <button id="UploadFirstCustomImage" class="btn btn-primary btn-sm default-button horizontal-text-clip">UPLOAD MEDIA</button>
        </>
    )



}