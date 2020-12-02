import select from "Editor/js/utils/selector/select";
import html_to_element from "Editor/js/utils/html_to_element";
import toggleKeyword from "./toggleKeyword";
import removeKeyword from "./removeKeyword";
import add_event from "Editor/js/utils/add_event";


export default function appendKeyword(keyword) {

    let KeywordsList = select("#Keywords_list");
    let keywordEl = html_to_element(
        '<div data-keyword="' + keyword + '" class="search-keyword active">' +
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
}