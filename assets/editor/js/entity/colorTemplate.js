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

    this.themeColorId = {
        "5": "ACCENT_1",
        "6": "ACCENT_2",
        "7": "ACCENT_3",
        "8": "ACCENT_4",
        "9": "ACCENT_5",
        "10": "ACCENT_6",
        "14": "BACKGROUND_1",
        "16": "BACKGROUND_2",
        "13": "TEXT_1",
        "15": "TEXT_2",
    }
	
    this.getColor = (themeColorName) => {
        if (!themeColorName) return null;
        if (themeColorName.length <= 2 && this.themeColorId[themeColorName])
            themeColorName = this.themeColorId[themeColorName]
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

}

