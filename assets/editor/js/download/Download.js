import React from "react";
import apiService from "Editor/js/utils/apiService";
import preloader from "Editor/js/components/preloader";
import DownloadCard from "./DownloadCard";
import Header from "./Header";
import "./style.css";


export default function Download({ presentationId }) {
    const [downloadCards, setDownloadCards] = React.useState([]);
    const [NumberofDivs, setNumber] = React.useState([]);

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            apiService({
                url: "/api/presentation/download/get/" + presentationId,
                success: (downloadPresentations) => {
                    if (downloadPresentations.length > 0) {
                        const tmp = [];
                        let check = false;
                        downloadPresentations.forEach((downloadCardDetail, i) => {
                            tmp.push(
                                <DownloadCard
                                    downloadCardDetail={downloadCardDetail}
                                    presentationId={presentationId}
                                    key={i}
                                    check={!downloadCardDetail.completed && !check} />
                            );
                            if (!downloadCardDetail.completed && !check)
                                check = true;
                        });
                        setDownloadCards(tmp);
                         
                    }
                    preloader.hide();
                }
            });
            mounted.current = true;
        }
        var elements = document.querySelector("#downloadArea").children;
        
        for(var i = 0; i <  elements.length; i++){
            if((i==0 || i==1 || i==2    ) || elements.item(i).classList.contains("toggleBtn") ){
                continue;
            }else {
                elements.item(i).style.display ="none"
                 
                
            }
            
        
        }

        if( elements.length <3){
            document.querySelector(".toggleBtn").style.display="none"
        }
        
        document.querySelector(".toggleBtn").addEventListener("click", ()=> {
            document.querySelector(".toggleBtn").style.display="none";
        })
    });

    const startNewDownload = () => {
        preloader.show();
        apiService({
            url: "/api/presentation/download/start/" + presentationId,
            success: (r) => {
                if (r.success)
                    location.reload();
            }
        })
    }
    
    var elements = document.querySelector("#downloadArea").children; // getting all children of container

    const setOnClickFunc = ()=> { //toggle function 
        
         
        if(elements.item(4).style.display=="none") {
            for(var i = 0; i < elements.length; i++){
                if((i==0 || i==1 || i==2   ) || elements.item(i).classList.contains("toggleBtn")  ){
                    
                    continue;
                }else {
                    elements.item(i).style.display ="block"
                     
                    
                }}
        }else {
                for(var i = 0; i < elements.length; i++){
                    if((i==0 || i==1 || i==2    ) || elements.item(i).classList.contains("toggleBtn") ){
                        continue;
                    }else {
                        elements.item(i).style.display ="none"
                }
            }
        }
  }

 

    downloadCards.push(<Header key={downloadCards.length + 1} />);
    downloadCards.push(
      
        <h1 className="col-12 text-center" key={downloadCards.length + 1}>
            <button onClick={startNewDownload} className="btn btn-info">התחל הורדה חדשה</button>
        </h1>
      
    )

    downloadCards.reverse();

    downloadCards.push(<div onClick={setOnClickFunc} className="toggleBtn">Show More</div>)

    return downloadCards; 
}
