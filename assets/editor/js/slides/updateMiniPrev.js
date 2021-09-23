import Events from "Editor/js/Events";
import slide from "../entity/slide";
import session from "../session";
import preloader from "Editor/js/components/preloader";

const updateMiniPrev = (event) => {
  slide(session.CURRENT_SLIDE).cloneToMiniPrev();
};
const updateAllMiniPrev = (event) => {
  if (event.type == "saveChange.inited") {
    preloader.hide();
    Events.saveChange.thumbnail();
  } else if (!session.SAVED) {
    preloader.show();
  }

  session.PRESENTATION.slides.forEach((slide_) => {
    slide(slide_.slideId).cloneToMiniPrev();
  });
};

Events.listen("shape.released", updateMiniPrev);
Events.listen("slide.preview.updateAll", updateAllMiniPrev);
Events.listen("saveChange.inited", updateAllMiniPrev);
Events.listen("saveChange.content", updateMiniPrev);
