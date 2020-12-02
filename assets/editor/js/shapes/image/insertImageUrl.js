export default function insertImageUrl(g, imageUrl) {
    let image = g.querySelector("image");

    if (image) {
        let image_width = parseFloat(image.getAttribute("width"));
        let image_height = parseFloat(image.getAttribute("height"));

        let image_ratio = image_width / image_height;
        let width,
            height,
            width_prev,
            height_prev;

        if (image_ratio < 1) {
            // Portrait image
            width = 750;
            height = parseInt(750 / image_ratio);
            width_prev = 150;
            height_prev = parseInt(150 / image_ratio);
        } else {
            // Landscape image
            width = parseInt(750 * image_ratio);
            height = 750;
            width_prev = parseInt(150 * image_ratio);
            height_prev = 150;
        }
        let url = imageUrl + "?auto=compress&fit=crop&w=" + width + "&h=" + height;
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url);
    }
}