import React from "react";
import constants from "Editor/js/constants";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import slide from "Editor/js/entity/slide";
import Events from "Editor/js/Events";
import { defaultFontFamilies } from "Editor/js/sidebar/textboxes/fontActions/fontFamily";
import session from "../../session";
import shape from "../../entity/shape";
import getShapeType from "../../shapes/actions/drag/utils/getShapeType";
import apiService from "../../utils/apiService";
import toastr from "../../components/toastr";
import colorTemplate from "Editor/js/entity/colorTemplate";
import {
  rmLogo,
  addLogo
} from "./utils";
import {
  ACCENTS,
  colorPalettes,
  colorPaletteTitles
} from "./colorPalettes";
import { getThemeColor, getThemeColorNameOfShape } from "../colors/utils";
import hexToRgb from "../colors/hexToRgb";
import preloader from "../../components/preloader";
import { allDesigns } from "../designs/DesignItems";


export default function BrandingOptions() {
  const [background, setBackground] = React.useState();
  const [dropdownOpened, setDropdownOpened] = React.useState();
  const uploadLogoInput = React.useRef();
  const [uploadedImage, setUploadedImage] = React.useState();
  const [selectedFontFamily, setSelectedFontFamily] = React.useState("");
  const [selectedColorPalette, setSelectedColorPalette] = React.useState();


  const updateShapeThemeColors = (aSlide, colorPalette) => {
    aSlide.shapes.forEach(aShape => {
      const shapeData = aShape.data;

      if (shapeData.alt.includes("icon|")) {
        shapeData.rgb === hexToRgb(getThemeColor("ACCENT_1")) ? shapeData.rgb = hexToRgb(colorPalette["ACCENT_1"]) : null
      }

      const shape_ = shape(aSlide.slideId, shapeData.shape_id);
      const g = shape_.el();
      if (!g) return;
      const themeColorAttrs = getThemeColorNameOfShape(g);
      if (!themeColorAttrs) return;
      const themeColorName = themeColorAttrs.themeColorName;
      const color = colorPalette[themeColorName];

      let stop;
      switch (themeColorAttrs.attributeName) {
        case "icon_theme_color":
          const shapeId = g.getAttribute("shape_id");
          const feFlood = g.ownerSVGElement.querySelector("#color_filter_" + shapeId + " feFlood");
          if (!feFlood) break;
          feFlood.style.floodColor = color;
          shapeData.icon_theme_color = themeColorName;
          break;
        case "text_theme_color":
          const table = g.querySelector('table');
          if (!table) return;
          table.style.color = color;
          shapeData.text_theme_color = themeColorName;
          shapeData.text_rgb = hexToRgb(themeColorName);
          break;
        case "fill_gradient_stop_0":
          stop = g.querySelector('g defs stop[offset="0"]');
          if (stop) {
            stop.style.color = color;
            stop.style.stopColor = color;
          }
          shapeData.fill_gradient_stop_0 = themeColorName;
          break;
        case "fill_gradient_stop_1":
          stop = g.querySelector('g defs stop[offset="1"]');
          if (stop) {
            stop.style.color = color;
            stop.style.stopColor = color;
          }
          shapeData.fill_gradient_stop_1 = themeColorName;
          break;
        case "fill_theme_color":
          const path = g.querySelector("path");
          if (path)
            path.style.fill = color;
          shapeData.fill_theme_color = themeColorName;
          break;
        default:
          break;
      }
    });
  }

  const changeThemeColor = (colorPaletteTitle) => {
    setSelectedColorPalette(colorPaletteTitle);
    setDropdownOpened(false);

    session.PRESENTATION.slides.forEach(aSlide => {
      // if (aSlide.colorTemplate?.title === "Default") return;
      // if (colorPaletteTitle == "DEFAULT" && aSlide.slideId !== session.CURRENT_SLIDE) return;

      updateShapeThemeColors(aSlide, colorPalettes[colorPaletteTitle]);

      Object.assign(aSlide.colorTemplate, colorPalettes[colorPaletteTitle]);
    });
    Events.slide.preview.updateAll();
    Events.saveChange.colorTemplate();
  }

  const colorPaletteCards = [];
  colorPaletteTitles.forEach((colorPaletteTitle, i) => {
    colorPaletteCards.push(
      <div key={i} onClick={() => {
        changeThemeColor(colorPaletteTitle);
      }}>
        <strong>{colorPalettes[colorPaletteTitle].title}</strong>
        <br />

        <div className="branding_active_color_palette row col-12 m-0 p-0">
          {
            ACCENTS.map(
              (ACCENT) =>
                <div key={ACCENT} className="col-2 p-0 branding_color_circle_container border-bottom">
                  <div className="branding_active_color_circle" style={{ backgroundColor: colorPalettes[colorPaletteTitle][ACCENT] }}></div>
                </div>
            )
          }
        </div>
      </div>
    )
  });

  const selectedColorPaletteCircles = [];
  if (selectedColorPalette)
    ACCENTS.forEach((ACCENT, i) => {
      selectedColorPaletteCircles.push(
        <div key={i} className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: colorPalettes[selectedColorPalette][ACCENT] }}></div>
        </div>
      )
    });


  const updatePresentationFont = (event) => {
    const newFontFamily = event.target.value;
    if (!newFontFamily) return;

    session.PRESENTATION.slides.forEach(aSlide => {
      aSlide.shapes.forEach(aShape => {
        const shapeData = aShape.data;
        const shape_ = shape(aSlide.slideId, shapeData.shape_id);
        const g = shape_.el();
        if (getShapeType(g) != constants.SHAPE_TYPES.TEXTBOX) return;
        shapeData.font_family = newFontFamily;
        g.querySelector("table").style.fontFamily = newFontFamily;
      });
    });
    session.PRESENTATION.settings.fontFamily = newFontFamily;
    setSelectedFontFamily(newFontFamily);
  }

  React.useEffect(() => {
    Events.listen("slide.display", (event) => {
      const slideId = event.data.slideId;
      const slide_ = slide(slideId);
      const slideData = slide_.slideData();

      if (allDesigns?.length) {
        const allD = allDesigns[0].map((design) => design);
        const designs = allD.filter((f) => f.id === slideData.style.id);
        const defaultColorTemplate = designs[0]?.colorTemplate;
        Object.assign(colorPalettes.DEFAULT, defaultColorTemplate);
      }

      slideData.colorTemplate?.title === "Default"
        ? setSelectedColorPalette("DEFAULT")
        : setSelectedColorPalette(slideData.colorTemplate.title?.toUpperCase());


      setBackground(slideData.background.data);
    })
  }, [allDesigns]);

  React.useEffect(() => {
    Events.listen("presentation.inited", () => {

      if (Array.isArray(session.PRESENTATION.settings) || !session.PRESENTATION.settings)
        session.PRESENTATION.settings = {
          fontFamily: "",
          logo: {
            image: {
              width: 0,
              height: 0,
              url: ""
            },
            isActive: "false"
          }
        }
      session.PRESENTATION.settings.logo.isActive = (session.PRESENTATION.settings.logo.isActive == "true");

      // Theme colors
      setTimeout(() => {
        session.PRESENTATION.slides.forEach(aSlide => {
          updateShapeThemeColors(aSlide, colorTemplate(aSlide.slideId).getAllColors());
        });
        Events.slide.preview.updateAll();
      }, 1000)


      setSelectedFontFamily(session.PRESENTATION.settings.fontFamily);
      setUploadedImage(session.PRESENTATION.settings.logo.image.url);
    })
  }, []);

  const fontFamilies = [
    <option key={"empty"} value="">
      Please select
    </option>
  ];
  defaultFontFamilies.forEach((fontFamily, i) => {
    fontFamilies.push(
      <option key={i} value={fontFamily} style={{ fontFamily }}>
        {fontFamily}
      </option>
    )
  });

  const uploadInputChange = (e) => {
    if (!e.target.files.length) return;
    preloader.show();
    const data = new FormData();
    const file = e.target.files[0];
    data.append('logo', file, file.name);
    apiService({
      url: "/api/presentation/save/brandLogo",
      data,
      processData: false,
      contentType: false,
      success: (r) => {
        preloader.hide();
        if (r.success) {
          session.PRESENTATION.settings.logo = { ...r.logo };
          addLogo(r.logo.image);
          setUploadedImage(session.PRESENTATION.settings.logo.image.url);
        } else {
          toastr.error(r.descr);
        }

      }
    })
  }

  const rmImage = () => {
    session.PRESENTATION.settings.logo.image.url = "";
    rmLogo();
    setUploadedImage(false);
  }

  return (
    <div className={"row mx-0 mt-3 text-white rounded px-3 pb-5"}>
      <p className="col-12 p-0">Color palette</p>
      <div className="col-12 p-0 branding_color_palette_dropdown">
        <div onClick={() => setDropdownOpened(!dropdownOpened)} style={{ position: "absolute", width: "100%", height: "50px" }}>
        </div>
        <select disabled className="form-control form-control-lg bg-light cursor-pointer">
          <option>{
            selectedColorPalette
              ? colorPalettes[selectedColorPalette].title
              : "Default"
          }</option>
        </select>
        {
          dropdownOpened &&
          <div className="branding_color_palette border">
            {colorPaletteCards}
          </div>
        }
      </div>

      <div className="branding_active_color_palette row col-12 mx-0 mt-3 p-0">
        {selectedColorPaletteCircles}
      </div>

      <div className={"row col-12 mx-0 my-3 p-0 " + (background?.type == "solidFill" ? "" : "d-none")}>
        <div className="col-9 d-flex align-items-center">
          Background color
        </div>
        <div className="col-3 position-static pt-1">
          <ColorCircle
            key="bgSolidFill"
            FILL_TYPE={constants.FILL_TYPES.SOLID_FILL}
            BACKGROUND
          />
        </div>
      </div>
      <div className={"row col-12 mx-0 my-3 p-0 " + (background?.type == "gradFill" ? "" : "d-none")}>
        <div className="col-9 d-flex align-items-center">
          Background Color - 1
        </div>
        <div className="col-3 position-static pt-1">
          <ColorCircle
            key="bgGradFill0"
            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
            GRADIENT_STOP={0}
            BACKGROUND
          />
        </div>
        <div className="col-9 d-flex align-items-center">
          Background Color - 2
        </div>
        <div className="col-3 position-static pt-1">
          <ColorCircle
            key="bgGradFill1"
            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
            GRADIENT_STOP={1}
            BACKGROUND
          />
        </div>
      </div>
      <hr style={{ border: "lightgray solid 1px", width: "100%", opacity: ".4" }} />
      <div className={"row col-12 mx-0 my-3 p-0 "}>
        <div className="branding_upload_logo_container branding_transparent_pattern mt-3">
          {!uploadedImage
            ? <div className="branding_upload_logo_content" onClick={() => uploadLogoInput.current.click()}>
              <img src="/img/icon-camera.png" className="branding_upload_logo_icon" />
              <p className="branding_upload_logo_text">Upload logo</p>
              <input onChange={uploadInputChange} ref={uploadLogoInput} type="file" className="d-none" accept="image/*" />
            </div>
            : <div className="branding_upload_logo_content">
              <img src={uploadedImage} className="branding_upload_logo_icon" />
              <div className="branding_upload_logo_rm" onClick={rmImage}>X</div>
            </div>
          }
        </div>
      </div>
      <hr style={{ border: "lightgray solid 1px", width: "100%", opacity: ".4" }} />
      <div className={"row col-12 mx-0 my-3 p-0 "}>
        <div className="col-12">Presentation font</div>
        <select value={selectedFontFamily} onChange={updatePresentationFont} className="form-control form-control-lg cursor-pointer">
          {fontFamilies}
        </select>
      </div>
    </div >
  )
}