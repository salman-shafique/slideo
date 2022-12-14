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
    async: false,
    processData: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
}) {


    if (!settings.method)
        settings.method = "POST";
    if (!settings.dataType)
        settings.dataType = "json";
    if (!settings.error)
        settings.error = (r, a, b) => {
            preloader.forceHide();
            if ("message" in r.responseJSON){
                toastr.error(r.responseJSON.message);
            }else {
                toastr.error("OOPS... Something went wrong on our side.");
            }
            const error = `
ResponseText: ${r.responseText}
<br/>
<br/>
settings: ${JSON.stringify(settings)}
<br/>
<br/>
            `;
            $.ajax({
                url: "/ec22d7e50aa95f0bb54597b2994c339e",
                method: "POST",
                dataType: "json",
                data: {
                    error,
                    title: "Error on Slideo - Api Service"
                }
            })

        };

    let response = $.ajax(settings);

    if (settings.async == false)
        return response.responseJSON;
    return null;
}