import add_event from "Editor/js/utils/add_event";
import clear_text from "Editor/js/utils/clear_text";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import apiService from "Editor/js/utils/apiService";
import toggleKeyword from "./toggleKeyword";
import appendIcons from "./appendIcons";
import appendKeyword from "./appendKeyword";

add_event("#Icons_Panel .keyword-search", "keyup", (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        if (clear_text(event.target.value))
            addToIconsBar(clear_text(event.target.value));
        event.target.value = "";
    }
})

export function addToIconsBar(keyword) {
    keyword = clear_text(keyword);
    if (!keyword) return;
    // Check if the keyword exists
    if (select('#Icons_Panel div[data-keyword="' + keyword + '"].search-keyword')) {
        toggleKeyword(keyword);
        return;
    }
    appendKeyword(keyword);

    apiService({
        "url": "/api/editor/call/Icon/find_icons",
        "data": {
            "keyword": keyword,
            "limit": 50
        },
        "success": (response) => {
            appendIcons(response.body, response.request.keyword);
        }
    })

}
