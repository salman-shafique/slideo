
function base64toFile(dataurl, filename = "Image_from_url.jpeg") {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

const file = base64toFile(localStorage.getItem('picture'));
const dt = new DataTransfer();
dt.items.add(file);
document.querySelector(`input[name="file1"]`).files = dt.files;


