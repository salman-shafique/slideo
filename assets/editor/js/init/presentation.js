import presentation from "Editor/js/entity/presentation.js";

jQuery(function () {
    $.ajax({
        method: "POST",
        url: "/editor/presentation/init",
        dataType: "json",
        success: function (presentationData) {
            presentation().init(presentationData);
        }
    })
})
