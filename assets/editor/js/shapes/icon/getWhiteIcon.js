import apiService from "Editor/js/utils/apiService";
import shape from "Editor/js/entity/shape";


/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{id:string,url:string,uploader_id:string}} icon 
 * @param {string} color "r g b"
 */
export default function getWhiteIcon(slideId, shapeId) {

    let shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    apiService({
        url: "/api/editor/icon/changeColor",
        data: {
            "slideId": slideId,
            "shapeId": shapeId,
            "rgb": ["255","255","255"],
            "url": shapeData.icon.url
        },
        success: (response) => {
            let shape_ = shape(response.slideId, response.shapeId);
            let shapeData = shape_.data();
            shapeData.icon.url = response.url;
            shapeData.icon.rgb = "255 255 255";
            let image = shape_.el().querySelector("image");
            image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", shapeData.icon.url);;
        }
    });

}