import React from "react";
import ReactDOM from "react-dom";
import UploadImageArea from "./UploadImageArea";
import apiService from "Editor/js/utils/apiService";


apiService({
    url: "/api/editor/image/userimages",
    success: (images) => {
        ReactDOM.render(<UploadImageArea images={images} />, document.getElementById("uploadUserImageArea"))
    }
})


