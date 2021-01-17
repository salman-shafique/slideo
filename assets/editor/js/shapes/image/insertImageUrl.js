export default function insertImageUrl(g, imageUrl) {
    let image = g.querySelector("image");

    if (image) {
        if (imageUrl.includes("pexels")) {
            let image_width = parseFloat(image.getAttribute("width"));
            let image_height = parseFloat(image.getAttribute("height"));

            let image_ratio = image_width / image_height;
            let width,
                height;

            if (image_ratio < 1) {
                // Portrait image
                width = 750;
                height = parseInt(750 / image_ratio);
            } else {
                // Landscape image
                width = parseInt(750 * image_ratio);
                height = 750;
            }
            imageUrl += "?auto=compress&fit=crop&w=" + width + "&h=" + height;
        }
        
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imageUrl);
    }
}