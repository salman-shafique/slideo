import select from "Editor/js/utils/selector/select";
import reactToDOM from "Editor/js/utils/reactToDOM";
import appendKeyword from "./appendKeyword";
import toggleKeyword from "./toggleKeyword";
import React from "react";
import ReactDOM from "react-dom";
import Icon from "./Icon";

export default function appendIcons(icons, keyword) {
    // Check keyword
    if (!select('#Icon_keywords_list div[data-keyword="' + keyword + '"].search-keyword'))
        appendKeyword(keyword);

    const sideBarIcons = select("#sideBarIcons");
    const div = reactToDOM(
        <div className={"icon-container"} data-keyword={keyword} style={{"filter":"invert(100%) sepia(100%) saturate(0%) hue-rotate(46deg) brightness(104%) contrast(102%)"}}>

        </div>
    );
    sideBarIcons.append(div);

    const iconEls = [];
    icons.forEach((iconData, i) => {
        iconEls.push(
            <Icon key={i} iconData={iconData} />
        )
    });
    ReactDOM.render(iconEls, div);

    toggleKeyword(keyword);
    select("#sideBarIconsEmpty").style.display = "none";
}