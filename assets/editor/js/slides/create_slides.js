import create_slide_modal from "Editor/js/entry/create_slide_modal";
import slide from "Editor/js/entity/slide";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import toastr from "Editor/js/components/toastr";
import sidebar from "Editor/js/entity/sidebar";
import manipulateHtml from "./manipulateHtml";

export default function create_slides() {
    create_slide_modal.close();

    preloader.show();
    apiService({
        url: "/api/editor/create/slides",
        data: {
            "innerHtml": manipulateHtml()
        },
        success: (response) => {
            window.editor?.setData("");
            if (response.success === false) {
                toastr.error(response.descr);
                preloader.hide();
                return;
            }
            if (response.presentationId) {
                location.href = "/editor/" + response.presentationId;
                return;
            }
            // Create slides
            response.forEach(slideData => {
                slide().appendToPresentation(slideData).insertToPage();
            });
            sidebar.open("Design_Tool");
            preloader.hide();
            window.tinymce.get("texteditor").setContent("")
        }
    });
}