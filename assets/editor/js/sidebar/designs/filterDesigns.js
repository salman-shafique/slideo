import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";

let selectedLayouts = new Set();
let query = "ad";

const filterDesigns = (newQuery = null) => {
    if (newQuery != null) query = newQuery;

    // Show all
    let designs = selectAll("#Design_Panel .design-container>*[layoutid]");
    if (designs) {
        designs.forEach(designItem => {
            designItem.style.display = "";
        });

        designs.forEach(designItem => {
            if (selectedLayouts.size > 0) {
                let layoutId = designItem.getAttribute("layoutid");
                if (!selectedLayouts.has(parseInt(layoutId))) {
                    designItem.style.display = "none";
                }
            }
            if (query.length>2) {
                let keywords = designItem.getAttribute("keywords") ? designItem.getAttribute("keywords") : "";
                if (!keywords.includes(query)) {
                    designItem.style.display = "none";
                }
            }
        });
    }


}

export { query, selectedLayouts, filterDesigns }