import constants from "Editor/js/constants";
import slide from "Editor/js/entity/slide";
import session from "../../session";
import shape from "../../entity/shape";
import createNewImage from "../../shapes/image/createNewImage";


/**
 * 
 * @param {SVGGElement} logo 
 * @param {{url:string,width:number,height:number}} image 
 */
export const updateLogo = (logo, image) => {

    const imageRatio = image.width / image.height;
    const x = constants.SVG_WIDTH() / 48 * 39;
    const y = constants.SVG_HEIGHT() / 24;
    const width = constants.SVG_WIDTH() / 48 * 8;
    const height = width / imageRatio;

    logo.setAttribute('x', x);
    logo.setAttribute('y', y);
    logo.setAttribute('width', width);
    logo.setAttribute('height', height);

    const imageElement = logo.querySelector("image");
    imageElement.setAttribute('x', x);
    imageElement.setAttribute('y', y);
    imageElement.setAttribute('width', width);
    imageElement.setAttribute('height', height);
    imageElement.setAttribute('xlink:href', image.url);

    shapeData = shape(logo).shapeData();
    shapeData.image = { ...image };
    shapeData.x = x;
    shapeData.y = y;
    shapeData.width = width;
    shapeData.height = height;
}

export const rmLogo = () => {
    const tmpCurrentSlide = session?.CURRENT_SLIDE;

    session.PRESENTATION.slides.forEach(aSlide => {
        const slide_ = slide(aSlide.slideId);
        slide_.display();
        const logo = slide_.page().querySelector("g[role='logo']");
        if (logo)
            shape(logo).remove();
    });

    if (tmpCurrentSlide)
        slide(tmpCurrentSlide).display();
}


/**
 * 
 * @param {{url:string,width:number,height:number}} image 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} slideId 
 * @returns 
 */
export const addLogoToSlide = (image, x, y, width, height, slideId) => {
    const slide_ = slide(slideId);
    slide_.display();
    const logo = slide_.page().querySelector("g[role='logo']");
    if (logo) {
        const imageElement = logo.querySelector("image");
        if (imageElement.getAttribute("xlink:href") != image.url)
            updateLogo(logo, image);
        shape(logo).restore();
        return;
    };

    createNewImage(
        {
            image,
            x,
            y,
            width,
            height,
            role: "logo"
        },
        slideId
    );
}


/**
 * 
 * @param {{url:string,width:number,height:number}} image 
 * @param {string} slideId 
 * @returns 
 */
export const addLogo = (image = session?.PRESENTATION?.settings?.logo?.image, slideId = null) => {
    if (!image?.url) return;
    if (!session?.PRESENTATION?.settings?.logo?.isActive) return;

    const imageRatio = image.width / image.height;

    const x = constants.SVG_WIDTH() / 48 * 39;
    const y = constants.SVG_HEIGHT() / 24;
    const width = constants.SVG_WIDTH() / 48 * 8;
    const height = width / imageRatio;

    const tmpCurrentSlide = session?.CURRENT_SLIDE;
    slideId
        // For a slide
        ? addLogoToSlide(image, x, y, width, height, slideId)
        // For all slides
        : session.PRESENTATION.slides.forEach(aSlide => {
            addLogoToSlide(image, x, y, width, height, aSlide.slideId);
        });

    if (tmpCurrentSlide)
        slide(tmpCurrentSlide).display();
}