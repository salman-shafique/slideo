import apiService from "Editor/js/utils/apiService";
import shape from "Editor/js/entity/shape";


/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{id:string,url:string,uploader_id:string}} icon 
 * @param {string} color "r g b"
 */
export default function changeIconColor(slideId, shapeId, icon = null, color) {

    let shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    if (icon)
        shapeData.icon = icon;

    apiService({
        url: "/api/call/Icon/change_color",
        data: {
            "slideId": slideId,
            "shapeId": shapeId,
            "rgb": color.split(" "),
            "icon": {'url':shapeData.icon.url}
        },
        success: (response) => {
            let shape_ = shape(response.request.slideId, response.request.shapeId);
            let shapeData = shape_.data();
            shapeData.icon.url = response.body.url;
            shapeData.icon.rgb = shapeData.rgb = response.request.rgb.join(" ");
            let image = shape_.el().querySelector("image");
            image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", shapeData.icon.url);;
        }
    });

}