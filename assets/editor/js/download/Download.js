import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";


export default function Download({ presentationId }) {


    

    return (<h1>Downloading{presentationId}</h1>)
}

(function () {
    preloader().hide();
})()
