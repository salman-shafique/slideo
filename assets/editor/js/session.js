

let session = {
    DIRECTION: null,
    EDITOR: document.getElementById("area"),
    NEXT_SLIDE: {
        "slideTitle": "",
        "sentences": [],
        'direction': 'rtl'
    },
    NEW_SLIDES: [],
    PRESENTATION: null,
    /**
     * @type {string}
     */
    CURRENT_SLIDE: "",
    /**
     * @type {{shapeId: string,shape:SVGGElement, translate: {transform:SVGTransform,startingE:number,startingF:number}, scale: {transform:SVGTransform}, rotate: {transform:SVGTransform}}[]}
     */
    SELECTED_ELEMENTS: [],
    /**
     * @type {{x: number, y: number}}
     */
    SAVED_MOUSE_POS: null,
    /**
     * @type {string} SHAPE_STATE - "DRAGGING" | null
     */
    SHAPE_STATE: null,
    /**
     * @type {string} SLIDE_STATE - "CHANCING_DESIGN" | null
     */
    SLIDE_STATE: null
}
export default session 