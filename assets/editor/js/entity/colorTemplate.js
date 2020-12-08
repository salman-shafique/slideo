import select from "Editor/js/utils/selector/select";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import selectAll from "Editor/js/utils/selector/selectAll";
import updateColor from "Editor/js/shapes/actions/color/updateColor";

export default function colorTemplate(colorTemplateId) {
    if (!(this instanceof colorTemplate)) return new colorTemplate(...arguments);

    this.colorTemplateId = parseInt(colorTemplateId);

    this.select = () => {
        select(".color_template_dropdown_item[color-template-id='" + this.colorTemplateId + "']").click();
    }

    this.apply = () => {
        if (session.PRESENTATION.colorTemplateId != this.colorTemplateId) {
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
            let color = colors[colorName];
            /**
             * @type {Array<SVGGElement>} gs
             */
            let gs;
            // fill_theme_color
            gs = selectAll("g.SlideGroup g.Page g[fill_theme_color^='" + colorName + "']:not(.Background)", documentElement);
            gs.forEach((g) => updateColor(g).fillThemeColor(color));

            // fill_gradient_stop_0
            gs = selectAll("g.SlideGroup g.Page g[fill_gradient_stop_0^='" + colorName + "']:not(.Background)", documentElement);
            gs.forEach((g) => updateColor(g).fillGradientStop0(color));

            // fill_gradient_stop_1
            gs = selectAll("g.SlideGroup g.Page g[fill_gradient_stop_1^='" + colorName + "']:not(.Background)", documentElement);
            gs.forEach((g) => updateColor(g).fillGradientStop1(color));

            // Background
            /**
             * @type {SVGGElement} background
             */
            let background = select("g.SlideGroup g.Page g.Background", documentElement);
            if (background) {
                updateColor(background).background(colorName, color);
            }

            // text_theme_color
            gs = selectAll("g.SlideGroup g.Page g[text_theme_color^='" + colorName + "']:not(.Background)", documentElement);
            gs.forEach((g) => updateColor(g).fillText(color));

            // icon_theme_color
            gs = selectAll("g.SlideGroup g.Page g[icon_theme_color^='" + colorName + "']", documentElement);
            gs.forEach((g) => updateColor(g).fillIcon(color));

        });
    }


}

