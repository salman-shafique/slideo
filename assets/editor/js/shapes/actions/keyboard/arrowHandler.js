import session from "Editor/js/session";
import deSelectAll from "../drag/utils/deSelectAll";

let width_1 = 0;
let width_2 = 0;

export default function arrowHandler (event){
session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if(event.which === 37){
            width_1 += -500
            width_2 += 0
            selectedEl.translate.transform.setTranslate(
                selectedEl.translate.startingE + width_1,
                selectedEl.translate.startingF + width_2 ,
           );
        }
       else if(event.which === 38){
        width_2 += -500
        width_1 += 0
            selectedEl.translate.transform.setTranslate(
                selectedEl.translate.startingE +    width_1,
                selectedEl.translate.startingF +    width_2
            );
        }
        else if(event.which === 39){
            width_1 += 500
            width_2 += 0
            selectedEl.translate.transform.setTranslate(
                selectedEl.translate.startingE +  width_1,
                selectedEl.translate.startingF + width_2 ,
            );
        }
        else if(event.which === 40){
            width_2 += 500
            width_1 += 0
            selectedEl.translate.transform.setTranslate(
                selectedEl.translate.startingE +  width_1 ,
                selectedEl.translate.startingF +   width_2,
            );

        }
        else{
            deSelectAll()
        }
})
}