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

    const newShapeData = {
        data: {
            active: "true",
            alt: "newimage",
            rotation: 0,
            height,
            width,
            x,
            y
        }
    }
    
    $('object.main-container')[0].contentDocument.getElementById('selectionRectangle').setAttribute("height", newShapeData.data.height);
    $('object.main-container')[0].contentDocument.getElementById('selectionRectangle').setAttribute("width", newShapeData.data.width);    
    $('object.main-container')[0].contentDocument.getElementById('selectionRectangle').setAttribute("x", newShapeData.data.x);
    $('object.main-container')[0].contentDocument.getElementById('selectionRectangle').setAttribute("y", newShapeData.data.y);

    $('object.main-container')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("height", newShapeData.data.height);
    $('object.main-container')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("width", newShapeData.data.width);        
    $('object.main-container')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("x", newShapeData.data.x);
    $('object.main-container')[0].contentDocument.getElementById('selectionRectanglebounding').setAttribute("y", newShapeData.data.y);
}