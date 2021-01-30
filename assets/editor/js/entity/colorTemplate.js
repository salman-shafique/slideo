import select from "Editor/js/utils/selector/select";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import selectAll from "Editor/js/utils/selector/selectAll";
import updateColor from "Editor/js/shapes/actions/color/updateColor";

export default function colorTemplate(slideId) {
    if (!(this instanceof colorTemplate)) return new colorTemplate(...arguments);

    this.slideId = slideId;

    this.getAllColors = () => {
        const colorTemplate_ = slide(this.slideId).slideData().colorTemplate;
        let colors = {};
        Object.keys(colorTemplate_).forEach(colorName => {
            if (colorName != "id")
                colors[this.rigthColorName(colorName)] = colorTemplate_[colorName];
        });
        return colors;
    }

    this.getColor = (themeColorName) => {
        if (!themeColorName) return null;
        const colorTemplate_ = slide(this.slideId).slideData().colorTemplate;
        let color = null;
        Object.keys(colorTemplate_).forEach(colorName => {
            if (this.rigthColorName(colorName) == themeColorName)
                color = colorTemplate_[colorName];
        });
        return color;
    }

    this.rigthColorName = (wrongColorName) => {
        const dic = {
            "aCCENT1": "ACCENT_1",
            "aCCENT2": "ACCENT_2",
            "aCCENT3": "ACCENT_3",
            "aCCENT4": "ACCENT_4",
            "aCCENT5": "ACCENT_5",
            "aCCENT6": "ACCENT_6",
            "bACKGROUND1": "BACKGROUND_1",
            "bACKGROUND2": "BACKGROUND_2",
            "tEXT1": "TEXT_1",
            "tEXT2": "TEXT_2",
        }
        return dic[wrongColorName];
    }

    this.updateColors = (colors) => {
        const colorTemplate_ = slide(this.slideId).slideData().colorTemplate;
        Object.keys(colorTemplate_).forEach(colorName => {
            if (colorName == "id") return;

            if (colors[this.rigthColorName(colorName)])
                colorTemplate_[colorName] = colors[this.rigthColorName(colorName)];

        });
    }


    this.changeColors = (colors = null) => {
        const slide_ = slide(this.slideId);
        if (!slide_.documentElement()) return;

        if (colors)
            this.updateColors(colors);

        colors = this.getAllColors();

        const documentElement = slide_.documentElement();

        // From data
        console.log(slide_.slideData().shapes);
        
        // From G
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

    this.updateColorCircles = () => {
        const colorCircles = selectAll("#Colors_Panel .main-section .color");

        const colorTemplate_ = slide(this.slideId).slideData().colorTemplate;
        colorCircles.forEach(colorCircle => {
            const colorName = colorCircle.getAttribute("color-name");
            const color = colorTemplate_[(colorName.charAt(0).toLowerCase() + colorName.slice(1)).replace("_", "")];
            colorCircle.setAttribute("data-color", color);
            colorCircle.style.backgroundColor = color;
        });
    }
}

