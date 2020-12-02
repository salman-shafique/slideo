import add_event from "Editor/js/utils/add_event";
import clear_text from "Editor/js/utils/clear_text";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import apiService from "Editor/js/utils/apiService";
import toggleKeyword from "./toggleKeyword";
import appendImages from "./appendImages";
import appendKeyword from "./appendKeyword";

add_event(".keyword-search", "keyup", (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        if (clear_text(event.target.value))
            addToImagesBar(clear_text(event.target.value));
        event.target.value = "";
    }
})

export function addToImagesBar(keyword) {
    keyword = clear_text(keyword);
    if (!keyword) return;
    // Check if the keyword exists
    if (select('#Images_Panel div[data-keyword="' + keyword + '"].search-keyword')) {
        toggleKeyword(keyword);
        return;
    }
    appendKeyword(keyword);

    apiService({
        "url": "/api/call/Pexels/find_images",
        "data": {
            "keyword": keyword,
            "per_page": 20
        },
        "success": (response) => {
            appendImages(response.body, response.request.keyword);
        }
    })

}
// test
add_event("#Images_Panel .keyword-dismiss", "click", (event) => {
    let keyword = event.target.getAttribute("data-keyword");
    let elementsToHide = selectAll('#Images_Panel *[data-keyword="' + keyword + '"]');
    elementsToHide.forEach(e => e.style.display = "none");
});