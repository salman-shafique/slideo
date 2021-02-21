

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
    INITED: false,
    /**
     * @type {string}
     */
    CURRENT_SLIDE: "",
    /**
     * @type {{
     *  shapeId: string
     *  shape: SVGGElement
     *  shapeType: "TEXTBOX" | "IMAGE" | "AUTO_SHAPE"
     *  size: {slope: number,width: number,height: number,x: number,y: number}
     *  translate: {transform:SVGTransform,startingE:number,startingF: number}
     *  scale: {transform:SVGTransform, startingA: number}
     *  rotate: {transform:SVGTransform}
     *  crop: {lt: {startingX:number, startingY:number},rt: {startingX:number, startingY:number},rb: {startingX:number, startingY:number},lb: {startingX:number, startingY:number}}
     * }[]}
     */
    SELECTED_ELEMENTS: [],
    /**
     * @type {{x: number, y: number}}
     */
    SAVED_MOUSE_POS: null,
    /**
     * @type {string} SHAPE_STATE - "DRAGGING" | "PREVIEW" null
     */
    SHAPE_STATE: null,
    /**
     * @type {boolean} TEXT_EDITING
     */
    TEXT_EDITING: false,
    /**
     * @type {string} SCALING_DIRECTION - lt,t,rt,r,rb,b,lb,l
     */
    SCALING_DIRECTION: null
}
export default session 