import shape from "Editor/js/entity/shape";
import Events from "../../Events";
import insertImageUrl from "./insertImageUrl";
import createForeignObject from "./createForeignObject";

export const updateImage = (slideId, shapeId, image) => {
  const shape_ = shape(slideId, shapeId);
  const shapeData = shape_.data();

  shapeData.image = image;

  if (image.keyword) shapeData.keyword = image.keyword;

  shape_.setImage(shapeData.image);

  insertImageUrl(shape_.el(), shapeData.image.url);

  if (session.SAVED) {
    Events.saveChange.content({ slideId, shapeId });
  }
};
/**
 *
 * @param {string} slideId
 * @param {string} shapeId
 * @param {{height:number,width:number,id:number,photographer:string,photographer_url:string,url:string}} image
 */

export default function selectH1Image(
  slideId,
  shapeId,
  image = null,
  fromUser = false
) {
  const shape_ = shape(slideId, shapeId);

  if (!shape_.el()?.querySelector("foreignObject"))
    createForeignObject(shape_.el());

  let shapeData = shape_.data();

  if (image) {
    Events.shape.image.changed({ oldImage: shapeData.image, newImage: image });
    if (fromUser) shapeData.isImageChanged = true;
    updateImage(slideId, shapeId, image);
    return;
  }
  updateImage(slideId, shapeId, shapeData.image);
}
