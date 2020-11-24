import presentation from "Editor/js/entity/presentation.js";
import apiService from "Editor/js/utils/apiService";

jQuery(function () {

    apiService({
        url: "/api/presentation/init",
        success: (response) => {
            presentation().init(response);
        }
    });
})
