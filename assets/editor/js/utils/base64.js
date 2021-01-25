const base64 = {
    encode: (str) => {
        return btoa(
            encodeURIComponent(str).replace(/%[0-9A-F]{2}/g,
                (p) => String.fromCharCode(parseInt(p.slice(1), 16)))
        );
    },
    decode: (str) => {
        return decodeURIComponent(Array.from(atob(str),
            (b) => `%${`00${b.charCodeAt(0).toString(16)}`.slice(-2)}`).join("")
        );
    }
}
export default base64;