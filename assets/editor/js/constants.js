

const constants = {
    SVG_WIDTH: 33867,
    SVG_HEIGHT: 19050,
    ALIGNMENTS: {
        "1": 'left',
        "2": 'center',
        "3": 'right',
        "4": 'justify'
    },
    GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
    IS_CHROME: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    TRANSFORM: {
        TRANSLATE: 2,
        SCALE: 3,
        ROTATE: 4
    }
}


export default constants 