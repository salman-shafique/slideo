import toastr from "Editor/js/components/toastr";
import preloader from "Editor/js/components/preloader";

export default function apiService(settings = {
    method: "",
    url: "",
    dataType: "",
    data: {},
    success: () => { },
    error: null,
    beforeSend: null,
    async: true,
    processData: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
}) {


    if (!settings.method)
        settings.method = "POST";
    if (!settings.dataType)
        settings.dataType = "json";
    if (!settings.error)
        settings.error = (r) => {
            preloader.forceHide();
            toastr.error("OOps... Something went wrong on our side...");
            console.error(r);
        };

    let response = $.ajax(settings);
    if (settings.async == false)
        return response.responseJSON;
    return null;
}