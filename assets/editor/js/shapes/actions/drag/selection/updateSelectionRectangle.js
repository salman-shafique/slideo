import session from "Editor/js/session";

export default function updateSelectionRectangle(selectionRectangleData, slideId = session.CURRENT_SLIDE) {
    let x = null;
    let y = null;
    if(selectionRectangleData.start_x > selectionRectangleData.end_x){
        x = selectionRectangleData.end_x;
    }
    else{
        x = selectionRectangleData.start_x;
    }
    if(selectionRectangleData.start_y > selectionRectangleData.end_y){
        y = selectionRectangleData.end_y;
    }
    else{
        y = selectionRectangleData.start_y;
    }
    // const y = selectionRectangleData.start_y;

    let width = selectionRectangleData.width;
    let height = selectionRectangleData.height;


    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectangle').setAttribute("height", height);
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectangle').setAttribute("width", width);    
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectangle').setAttribute("x", x);
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectangle').setAttribute("y", y);

    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("height", height);
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("width", width);        
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("x", x);
    $('object.main-container[data-slide-id="'+slideId+'"]')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("y", y);
}