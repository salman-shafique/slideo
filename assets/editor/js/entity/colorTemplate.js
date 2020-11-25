import select from "Editor/js/utils/selector/select";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import selectAll from "Editor/js/utils/selector/selectAll";


export default function colorTemplate(colorTemplateId) {
    if (!(this instanceof colorTemplate)) return new colorTemplate(...arguments);

    this.colorTemplateId = parseInt(colorTemplateId);

    this.select = () => {
        select(".color_template_dropdown_item[color-template-id='" + this.colorTemplateId + "']").click();
    }

    this.apply = () => {
        if (session.PRESENTATION.colorTemplateId != this.colorTemplateId) {
            console.log("send to server");
            session.PRESENTATION.colorTemplateId = this.colorTemplateId;
            this.updateAllColors()
        }
    }

    this.getAllColors = () => {
        let colorCircles = select("#Colors_Panel .colors-container.main-colors").children;
        let colors = {};
        colorCircles.forEach(colorCircle => {
            let colorName = colorCircle.getAttribute("color-name");
            let color = colorCircle.getAttribute("data-color");
            colors[colorName] = color;
        });
        return colors;
    }

    this.updateAllColors = (colors = null) => {

        if (!colors) colors = this.getAllColors();
        session.PRESENTATION.slides.forEach(aSlide => {
            this.updateSlideColors(aSlide.slideId, colors, aSlide);
        });
    }

    this.updateSlideColors = (slideId = "", colors = null, aSlide = null) => {
        if (!slide(slideId).documentElement()) return;
        if (!colors) colors = this.getAllColors();
        if (!aSlide) aSlide = slide(slideId).slideData();

        let documentElement = slide(slideId).documentElement();
        Object.keys(colors).forEach(colorName => {
            let selector = 'g.SlideGroup g.Page g[fill_theme_color^="' + colorName + '"]';

            //selector = selector.substring(0, selector.length - 1);
            let gs = selectAll(selector, documentElement);
            if (gs.length > 0) {
                let color = colors[colorName];
                gs.forEach((g) => this.changeShapeColor(g, color));
            }
        });
    }

    this.changeShapeColor = (g, color) => {
        if(g.getAttribute("fill_theme_color")){
            let path = g.querySelector("g[id]>path");
            path.style.fill = color;   
        }
    }
}

