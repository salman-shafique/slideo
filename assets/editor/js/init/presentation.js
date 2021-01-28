import presentation from "Editor/js/entity/presentation";
import apiService from "Editor/js/utils/apiService";
import sidebar from "Editor/js/entity/sidebar";
import preloader from "Editor/js/components/preloader";

jQuery(function () {
    preloader.show();
    apiService({
        url: "/api/presentation/init",
        success: (response) => {
            presentation().init(response);
            sidebar.init();
            preloader.hide();
        }
    });
})
