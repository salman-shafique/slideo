import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import OpacitySlider from "Editor/js/sidebar/components/OpacitySlider/OpacitySlider";
import getFillType from "Editor/js/shapes/actions/color/getFillType";
import Events from "Editor/js/Events";
import "./Options.css"

export default function ShapeOptions() {
    const [fillType, setFillType] = React.useState(null);
    const [secondGra, setSecondGra] = React.useState(false)
    const [FirstGra, setFirstGra] = React.useState(false)


    React.useEffect(() => {
        Events.listen("shape.selected", () => {
             
            let storedFillType = null;
            let allSame_ = true;
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.AUTO_SHAPE) {
                    const fillType_ = getFillType(selectedEl.shape);
                    if (storedFillType == null)
                        storedFillType = fillType_;

                    if (storedFillType != fillType_)
                        allSame_ = false;
                }
            });

            allSame_
                ? setFillType(storedFillType)
                : setFillType(null)

        });
         
        
      
    }, []);

   
    // const firstColorPicker = $(".color-circles")[3]
    // const secondColorPicker = $(".color-circles")[4]



    // $(".ShapeColor1").find(".color-circles").css("display")=="block" // close ---> this one is more stable
    // use FirstGra state // open 

 
   

    // if(FirstGra==false){
    //     if($(".ShapeColor1").find(".color-circles").css("display")=="block"){
    //         $(".ShapeColor2").attr("style","margin-top: inherit !important")
    //     }else{
    //         $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //     }
    // }

   
    // if(FirstGra==true){
    //    if(secondGra==true){
            
    //             $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //             console.log("hem ilk hem ikinci açık")
            
            
    //             firstColorPicker.classList.remove("d-none")
    
            
            
    //             // do not add classList then it diseappears totally. use css(property,value)
    //             $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //             firstColorPicker.lastElementChild.classList.add("d-none")
    //             if($(".ShapeColor1").find(".color-circles").css("display")=="block"){
    //             $(".ShapeColor2").attr("style","margin-top: inherit !important")
    //         }
          
           
    //     }else{
    //         $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //         firstColorPicker.lastElementChild.classList.add("d-none")
    //         firstColorPicker.classList.remove("d-none")
    //     }
            
         
    // }else if(FirstGra==false){
    //     if($(".ShapeColor1").find(".color-circles").css("display")=="block"){// kapalıysa false oldugunda color-circle yok et
    //         // $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //         // console.log("hem ilk hem ikinci açık")
    //         firstColorPicker.classList.add("d-none")
    //         $(".ShapeColor2").attr("style","margin-top: inherit !important")
         
             
    //         if(secondGra==true){
    //             $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //         }else{
    //             $(".ShapeColor2").attr("style","margin-top: inherit !important")
    //         }
             
             
    //     }else{
    //         if(secondGra==true){
    //             $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //         } 
            
            
    //     }
    // } 
    

  
  
   
    // if(FirstGra==true && secondGra==true){
    //             $(".ShapeColor2").attr("style","margin-top: 15rem !important")
    //                  console.log("hem ilk hem ikinci açık")
                
                
    //                 firstColorPicker.classList.remove("d-none")
                   
        
    // }else if(  $(".ShapeColor1").find(".color-circles").css("display")=="block"  ){
    //     console.log("ssss")
    //     console.log($(".ShapeColor1").find(".color-circle-single").val())
    //     console.log($(".ShapeColor1").find(".color-circles")["length"])
    //     $(".ShapeColor2").attr("style","margin-top: inherit !important")
    // }
    
    
     
     
   
    
      
   
 

    return (
        <>
            <div className={"row mx-0 mt-3 bg-white rounded "}>
                <div className={"row col-12 m-0 p-0 " + (fillType === constants.FILL_TYPES.SOLID_FILL ? "" : "d-none")}>
                    <div className="col-9 d-flex align-items-center">
                        Shape Color
                    </div>
                    <div className="col-3 position-static pt-1 main">
                        <ColorCircle
                            key="solidFill"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.SOLID_FILL}
                        />
                        
                    </div>
                </div>
                <div className={"row col-12 m-0 p-0  " + (fillType === constants.FILL_TYPES.GRADIENT_FILL ? "" : "d-none")}>
                    <div className="row col-12 m-0 p-0 ShapeColor1 ">
                    <div className="col-9 d-flex align-items-center Shape1  ">
                        Shape Color - 1
                    </div>
                   
                       
                    
                    <div className="col-3  position-static pt-1    "   onClick={() => {
                    setFirstGra(!FirstGra);
                   
                    
                }} >
                        <ColorCircle
                            key="gradFill0"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={0} />
                            
                          
                    </div>
                  
             
                    </div>
                    <div className="row col-12 m-0  p-0 ShapeColor2  full">
                    <div className="col-9 d-flex align-items-center Shape2   ">
                         Shape Color - 2 
                    </div>
                
                        
                   
                    <div className="col-3 position-static pt-1  "        onClick={() => {
                        setSecondGra(!secondGra)
                   
                       
                }}>  
                        <ColorCircle
                            key="gradFill1"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={1} />
                            
            </div>
                    </div>
                
                
                </div>
                <div className="row col-12 align-items-center basic">
                    <div className="col-3 d-flex ">
                        Opacity:
                    </div>
                    <div className="col-9 position-static pt-1  ">
                        <OpacitySlider
                            key="shapeOpacity"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                        />
                        
                    </div>
                    </div>
                
            </div>
        </>
    )
}