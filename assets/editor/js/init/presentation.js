import presentation from "Editor/js/entity/presentation";
import apiService from "Editor/js/utils/apiService";
import sidebar from "Editor/js/entity/sidebar";

jQuery(function () {

    apiService({
        url: "/api/presentation/init",
        success: (response) => {
            presentation().init(response);
            sidebar().init();
        }
    });
})
