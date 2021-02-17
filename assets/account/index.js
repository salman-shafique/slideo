import "CSS/account.css";

import "./presentation/";
import "./profile/";
import "./notifications/";
import { getParams } from "JS/utils";


$(document).ready(function () {
    $(".profile-screen-link").click(function () {
        $(".profile-screen-link").removeClass("active");
        var alteringIDBase = $(this).attr("id").replace("LinkResp", "").replace("Link", "");
        $("#" + alteringIDBase + "Link").addClass("active");
        $("#" + alteringIDBase + "LinkResp").addClass("active");
        $('.profile-tab').addClass("collapse");
        $("#" + alteringIDBase + "Tab").removeClass("collapse");
    });

    const tabId = getParams()['tab'];
    if (tabId)
        document.getElementById(tabId).click()
});