import clear_text from "Editor/js/utils/clear_text";
import shape from "Editor/js/entity/shape";
import apiService from "Editor/js/utils/apiService";

/**
 * 
 * @param {String} text 
 * @param {?Function} callback 
 * @param {?object} args 
 */
export default function findKeyword(text, callback = null, args = null) {
    text = clear_text(text);
    if (!text) return;

    return apiService({
        url: "/api/editor/call/NLP/extract_keyword",
        data: {
            "text": text
        },
        success: (response) => {
            const keyword = response.body.keyword;
            if (callback) {
                callback.call(this, ...args, keyword)
            }
        }
    });
}