export default function manipulateHtml() {
    const x = document.getElementsByTagName('iframe')[0].contentWindow;
    const direction = x.document.getElementsByTagName('body')[0].dir;

    const content = window.tinymce.get("texteditor").getContent();

    $("#data-container").html(content);

    const content1 = document.getElementById('data-container')
    //        console.log(content1);
    const regex1 = /\.*\d+\.+/g;
    const regex2 = /\.*\d+\.+/g;
    const regex3 = /\-/g;

    if (direction == 'ltr') {
        let match1 = content1.innerHTML.matchAll(regex2)
        for (res1 of match1) {
            content1.innerHTML = content1.innerHTML.replace('<p>' + res1[0], '<li>').replace("</p>", "</li>");
        }
    }

    else {
        let match = content1.innerHTML.matchAll(regex1)
        for (res of match) {
            content1.innerHTML = content1.innerHTML.replace("<p>" + res[0], "<li>").replace('</p>', '</li>');
        }

        let match0 = content1.innerHTML.matchAll(regex3)
        //			console.log(match0)
        for (res0 of match0) {
            content1.innerHTML = content1.innerHTML.replace("<p>" + res0[0], "<li>").replace('</p>', '</li>');
        }
    }

    content1.innerHTML = content1.innerHTML.replace('</p><li>', '</p><ul><li>').replace('</li><p>', '</li></ul><p>');
    return content1.innerHTML;
}