import add_event from "Editor/js/utils/add_event";
import apiService from "Editor/js/utils/apiService";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import toHex from "./toHex";


const addNewTemplate = () =>{
    // todo
}

add_event("#newTemplateBtn", "click", function () {

    let data = {
        title: select("#newTemplateTitle").value,
        description: select("#newTemplateDescr").value,
    }
    let colors = selectAll('div[color-name]');
    colors.forEach(color => {
        let colorName = color.getAttribute("color-name");
        let colorVal = toHex(color.getAttribute("data-color"));
        data[colorName] = colorVal;
    });
    if (data.title.length <= 2) {
        console.log("Please enter more");
        return;
    }
    apiService({
        url: "/api/editor/colorTemplate/add",
        data: data,
        success: (r) => {
            console.log(r);
        }
    });
}); 