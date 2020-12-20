

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
     * @type {{
     *  shapeId: string,
     *  shape: SVGGElement, 
     *  size: {slope: number,width: number,height: number,x: number,y: number}
     *  translate: {transform:SVGTransform,startingE:number,startingF: number}, 
     *  scale: {transform:SVGTransform, startingA: number}, 
     *  rotate: {transform:SVGTransform}
     * }[]}
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
     * @type {string} SCALING_DIRECTION - lt,t,rt,r,rb,b,lb,l
     */
    SCALING_DIRECTION: null
}
export default session 