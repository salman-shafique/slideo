export default function apiService(settings = {
    method: "",
    url: "",
    dataType: "",
    data: {},
    success: ()=>{},
    error: null,
    beforeSend: null,
    async: true,
}) {

    if (!settings.method)
        settings.method = "POST";
    if (!settings.dataType)
        settings.dataType = "json";
    if (!settings.error)
        settings.error = (r) => {
            console.log("error", r);
        };
        
    let response = $.ajax(settings);
    if (settings.async == false)
        return response.responseJSON;
    return null;
}