import clear_text from "Editor/js/utils/clear_text";
import shape from "Editor/js/entity/shape";
import apiService from "Editor/js/utils/apiService";


export default function findKeyword(text) {
    text = clear_text(text);
    if (!text) return;

    return apiService({
        url: "/api/editor/call/NLP/extract_keyword",
        data: {
            "text": text
        },
        success: (response) => {
        },
        async: false
    });
}