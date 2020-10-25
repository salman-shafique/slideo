
export default function is_rtl(text) {

    if (!text) return false;

    let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
    let rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
    let rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
    let rtl = 0;
    let ltr = 0;
    text.split("").forEach(c => {
        if (c) {
            if (rtlDirCheck.test(c))
                rtl++;
            else
                ltr++;
        }
    });
    return Boolean(rtl >= ltr);
}