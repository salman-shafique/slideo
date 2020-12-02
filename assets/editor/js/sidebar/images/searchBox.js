import add_event from "Editor/js/utils/add_event";
import clear_text from "Editor/js/utils/clear_text";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import apiService from "Editor/js/utils/apiService";
import html_to_element from "Editor/js/utils/html_to_element";
import toggleKeyword from "./toggleKeyword";
import removeKeyword from "./removeKeyword";

add_event(".keyword-search", "keyup", (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        if (clear_text(event.target.value))
            addToKeywordList(clear_text(event.target.value));
        event.target.value = "";
    }
})

function addToKeywordList(keyword) {
    // Check if the keyword exists
    if (select('#Images_Panel div[data-keyword="' + keyword + '"].search-keyword')) {
        toggleKeyword(keyword);
        return;
    }

    let KeywordsList = select("#Keywords_list");
    let keywordEl = html_to_element(
        '<div data-keyword="' + keyword + '" class="search-keyword">' +
        '<span data-keyword="' + keyword + '" class="keyword-text text-dark">' + keyword + '</span>&emsp;' +
        '<span class="text-dark keyword-dismiss" data-keyword="' + keyword + '"><i data-keyword="' + keyword + '" class="fas fa-times"></i></span>' +
        '</div>'
    );
    KeywordsList.prepend(keywordEl);

    // Toggle
    add_event(keywordEl.querySelector(".keyword-text"), "click", function () {
        let keyword = this.getAttribute("data-keyword");
        toggleKeyword(keyword);
    });

    // Remove
    add_event(keywordEl.querySelector(".keyword-dismiss"), "click", (event) => {
        let keyword = event.target.getAttribute("data-keyword");
        removeKeyword(keyword);
    });


    apiService({
        "url": "/api/call/Pexels/find_images",
        "data": {
            "keyword": keyword,
            "per_page": 20
        },
        "success": (response) => {
            if (response.body.length > 0) {
                let sideBarImages = select("#sideBarImages");
                response.body.forEach(imageData => {
                    let image = html_to_element(
                        '<img data-keyword="' + response.request.keyword + '" class="image-item" src="' + imageData.url + '?auto=compress&fit=crop&w=123&h=60"></img>'
                    );
                    sideBarImages.prepend(image);
                    toggleKeyword(response.request.keyword);
                    select("#sideBarImagesEmpty").style.display = "none";
                });
            }
        }
    })

}
// test
add_event("#Images_Panel .keyword-dismiss", "click", (event) => {
    let keyword = event.target.getAttribute("data-keyword");
    let elementsToHide = selectAll('#Images_Panel *[data-keyword="' + keyword + '"]');
    elementsToHide.forEach(e => e.style.display = "none");
});