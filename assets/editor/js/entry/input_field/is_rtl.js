
export default function is_rtl(text) {

    if (!text) return false;

    const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
    const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
    const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
    let rtl = false;
    text.split("").forEach(c => {
        if (c)
            if (rtlDirCheck.test(c))
                rtl = true;
    });
    return rtl;
}