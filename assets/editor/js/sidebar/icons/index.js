import "./searchBox";
import session from "Editor/js/session";
import Events from "Editor/js/Events";
import { addToIconsBar } from "Editor/js/sidebar/icons/searchBox";

// Insert preset keywords to icons sidebar
Events.listen("presentation.inited", () => {
    const slides = session.PRESENTATION.slides.map(slide => slide.analyzedContent)
    const analyzedContents = slides.map(a => a.map(ac => ac))
    const analyzedData = analyzedContents.map(e => e)

    analyzedData.map(d => {
        const datas = d[0]
        const dataObjArr = Object.keys(datas)
        const keywords = dataObjArr.map(d => datas[d])
        keywords.map((key, i) => {
            typeof keywords[i] === "object" && keywords[i] !== null && keywords[i].data && keywords[i].data.keyword ?
                addToIconsBar(keywords[i].data.keyword) : null
        })
    })

})
