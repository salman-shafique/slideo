import apiService from "Editor/js/utils/apiService";
import shape from "Editor/js/entity/shape";


/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {string} iconId 
 * @param {string} color "r g b"
 */
export default function changeIconColor(slideId, shapeId, iconId, color) {

    let shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();
    let icon;
    shapeData.icons.forEach(icon_ => {
        if (icon_.id == iconId)
            icon = icon_;
    });
    icon.rgb = color;

    apiService({
        url: "/api/call/Icon/change_color",
        data: {
            "slideId": slideId,
            "shapeId": shapeId,
            "rgb": color.split(" "),
            "icon": icon
        },
        success: (response) => {
            let shape_ = shape(response.request.slideId, response.request.shapeId);
            let image = shape_.el().querySelector("image");

            shape_.data().icons.forEach(icon => {
                if (icon.id == response.request.icon.id)
                    icon.url = response.body.url;
            });
            image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", response.body.url);;
        }
    });

}