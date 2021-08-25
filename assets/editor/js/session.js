

let session = {
    DIRECTION: null,
    EDITOR: document.getElementById("area"),
    NEXT_SLIDE: {
        "slideTitle": "",
        "sentences": [],
        'direction': 'rtl'
    },
    NEW_SLIDES: [],
    /**
     * @type {{
     *  history: ?{current: number, actions: { slideId: string, actionType: number }[] }[],
     *  settings: {fontFamily: ?string, logo: {isActive: boolean, image:{url: string, width:number,height:number}}}
     *  slides: [],
     *  slidesOrder: String[]
     *  }}
     */
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
     * @type {{
     * slideId: string,
     * shapeId: string
     * }[]}
     */
    COPIED_ELEMENTS: [],
    /**
     * @type {{
     * slideId: string,
     * shapeId: string
     * }[]}
     */
    CUT_ELEMENTS: [],
    /**
     * @type {{x: number, y: number}}
     */
    SAVED_MOUSE_POS: null,
    /**
     * @type {{x: number, y: number}}
     */
    SAVED_SELECTION_MOUSE_POS: null,
    /**
     * @type {string} SELECTION_STATE - "STARTING" | "SELECTING" | null
     */
    SELECTION_STATE: null,
    /**
     * @type {string} SHAPE_STATE - "DRAGGING" | "PREVIEW" null
     * @type {number} 
     * PREVIEW: 0,
     * DRAG_STARTING: 1,
     * DRAGGING: 2,
     * RESIZING: 3
     */
    SHAPE_STATE: null,
    /**
     * @type {boolean} TEXT_EDITING
     */
    TEXT_EDITING: false,
    /**
     * @type {string} SCALING_DIRECTION - lt,t,rt,r,rb,b,lb,l
     */
    SCALING_DIRECTION: null,
    /**
     * @type {{slideId: number}} LAST_MINIPREV_UPDATE 
     */
    LAST_MINIPREV_UPDATE: {},

    SAVED: false
}

window.session = session;
export default session