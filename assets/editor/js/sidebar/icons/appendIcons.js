import select from "Editor/js/utils/selector/select";
import html_to_element from "Editor/js/utils/html_to_element";
import appendKeyword from "./appendKeyword";
import toggleKeyword from "./toggleKeyword";

export default function appendIcons(icons, keyword) {
    // Check keyword
    if (!select('#Icon_keywords_list div[data-keyword="' + keyword + '"].search-keyword'))
        appendKeyword(keyword);

    let sideBarIcons = select("#sideBarIcons");
    icons.forEach(iconData => {
        let icon = html_to_element(
            '<img data-keyword="' + keyword + '" class="icon-item col-4 py-2 bg-light rounded" src="' + iconData.url + '"></img>'
        );
        sideBarIcons.append(icon);
    });
    toggleKeyword(keyword);
    select("#sideBarIconsEmpty").style.display = "none";
}