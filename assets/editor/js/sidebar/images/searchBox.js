import add_event from "Editor/js/utils/add_event";
import clear_text from "Editor/js/utils/clear_text";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import apiService from "Editor/js/utils/apiService";
import html_to_element from "Editor/js/utils/html_to_element";


console.log("box");

add_event(".keyword-search", "keyup", (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        if (clear_text(event.target.value))
            addToKeywordList(clear_text(event.target.value));
        event.target.value = "";
    }
})

function addToKeywordList(keyword) {
    let KeywordsList = select("#Keywords_list");
    let keywordEl = html_to_element(
        '<div data-keyword="' + keyword + '" class="search-keyword">' +
        '<span class="keyword-text text-dark">' + keyword + '</span>&emsp;' +
        '<span class="text-dark keyword-dismiss" data-keyword="' + keyword + '"><i data-keyword="' + keyword + '" class="fas fa-times"></i></span>' +
        '</div>'
    );
    KeywordsList.prepend(keywordEl);

    add_event(keywordEl.querySelector(".keyword-dismiss"), "click", (event) => {
        let keyword = event.target.getAttribute("data-keyword");
        let elementsToHide = selectAll('#Images_Panel *[data-keyword="' + keyword + '"]');
        console.log(elementsToHide,keyword);
        elementsToHide.forEach(e => e.style.display = "none");
    });

    apiService({
        "url": "/api/call/Pexels/find_images",
        "data": {
            "keyword": keyword,
            "per_page": 5
        },
        "success": (response) => {
            if (response.body.length > 0) {
                let sideBarImages = select("#sideBarImages");
                response.body.forEach(imageData => {
                    let image = html_to_element(
                        '<img data-keyword="' + response.request.keyword + '" class="image-item" src="' + imageData.url + '?auto=compress&fit=crop&w=123&h=60"></img>'
                    );
                    sideBarImages.appendChild(image);
                });
            }
        }
    })

}