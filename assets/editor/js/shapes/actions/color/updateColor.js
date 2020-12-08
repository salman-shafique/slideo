export default function updateColor(g) {
    if (!(this instanceof updateColor)) return new updateColor(...arguments);

    /**
     * @type {SVGGElement} g
     */
    this.g = g;

    /**
     * @param {string} color 
     */
    this.fillThemeColor = function (color) {
        let path = this.g.querySelector("g[id]>path");
        if (!path) return;
        path.style.fill = color;
    }

    /**
     * @param {string} color 
     */
    this.fillGradientStop0 = function (color) {

        let stop = this.g.querySelector('g[id]>g>defs stop[offset="0"]');
        if (!stop) return;
        stop.style.color = color;
        stop.style.stopColor = color;
    }

    /**
     * @param {string} color 
     */
    this.fillGradientStop1 = function (color) {
        let stop = this.g.querySelector('g[id]>g>defs stop[offset="1"]');
        if (!stop) return;
        stop.style.color = color;
        stop.style.stopColor = color;
    }

    /**
     * @param {string} colorName 
     * @param {string} color 
     */
    this.background = function (colorName, color) {
        let path, stop;
        if (this.g.getAttribute("fill_theme_color")) {
            // fill_theme_color
            if (this.g.getAttribute("fill_theme_color").split(" ")[0] == colorName) {
                path = this.g.querySelector("path");
                if (path)
                    path.style.fill = color;
            }
        }
        if (this.g.getAttribute("fill_gradient_stop_0")) {
            // fill_gradient_stop_0
            if (this.g.getAttribute("fill_gradient_stop_0").split(" ")[0] == colorName) {
                stop = this.g.querySelector('g defs stop[offset="0"]');
                if (stop) {
                    stop.style.color = color;
                    stop.style.stopColor = color;
                }
            }
        }
        if (this.g.getAttribute("fill_gradient_stop_1")) {
            // fill_gradient_stop_1
            if (this.g.getAttribute("fill_gradient_stop_1").split(" ")[0] == colorName) {
                stop = this.g.querySelector('g defs stop[offset="1"]');
                if (stop) {
                    stop.style.color = color;
                    stop.style.stopColor = color;
                }
            }
        }
    }
    /**
     * @param {string} color 
     */
    this.fillText = function (color) {
        let table = this.g.querySelector('g table');
        if (!table) return;
        table.style.color = color;
    }

    /**
     * @param {string} color 
     */
    this.fillIcon = function (color) {
        let feFlood = this.g.querySelector('feFlood');
        if (!feFlood) return;
        feFlood.style.floodColor = color;
    }

}

