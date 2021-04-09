import presentation from "Editor/js/entity/presentation";
import apiService from "Editor/js/utils/apiService";
import sidebar from "Editor/js/entity/sidebar";
import preloader from "Editor/js/components/preloader";
import session from "Editor/js/session";
import { historyInit } from "../history/index";
import Events from "../Events";

jQuery(function () {
    preloader.show();
    apiService({
        url: "/api/presentation/init",
        success: (response) => {
            presentation().init(response);
            sidebar.init();
            historyInit();
            preloader.hide();
            session.INITED = true;
            Events.presentation.inited();
        }
    });
})
