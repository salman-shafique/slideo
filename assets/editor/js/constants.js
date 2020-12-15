

const constants = {
    SVG_WIDTH: 25400,
    SVG_HEIGHT: 14288,
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
    },
    MAX_SLIDE_CAPACITY: 8
}


export default constants 