import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";

export default function shape(slideId, shapeId) {
    if (!(this instanceof shape)) return new shape(...arguments);

    this.slideId = slideId;
    this.shapeId = shapeId;

    /**
     * @returns {object} shapeData
     */
    this.data = () => {
        let shapeData;
        slide(this.slideId).slideData().shapes.forEach(shape => {
            if (shape.data.shape_id == this.shapeId)
                shapeData = shape.data;
        });
        return shapeData;
    }

    /**
     * @returns {SVGGElement}
     */
    this.el = () => slide(this.slideId).documentElement().querySelector("g[shape_id='" + this.shapeId + "']");

    this.remove = function () {
        if (this.el()) {
            this.el().remove();
            this.data().active = false;
        }
    }


}

