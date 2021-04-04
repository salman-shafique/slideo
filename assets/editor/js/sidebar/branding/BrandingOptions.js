import React from "react";
import constants from "Editor/js/constants";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import slide from "Editor/js/entity/slide";
import Events from "Editor/js/Events";
import { defaultFontFamilies } from "Editor/js/sidebar/textboxes/fontActions/fontFamily";

export default function BrandingOptions() {
  const [background, setBackground] = React.useState();
  const [dropdownOpened, setDropdownOpened] = React.useState();
  const [logoUploadOpened, setLogoUploadOpened] = React.useState(true);
  const uploadLogoInput = React.useRef();
  const [uploadedImage, setUploadedImage] = React.useState();


  React.useEffect(() => {
    Events.listen("slide.display", (event) => {
      const slideId = event.data.slideId;
      const slide_ = slide(slideId);
      const slideData = slide_.slideData();
      setBackground(slideData.background.data);
    });
  }, []);

  const showLogo = (e) => {
    setLogoUploadOpened(!logoUploadOpened);
  }

  const uploadInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setUploadedImage(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const rmImage = () => {
    setUploadedImage(false);
  }

  const updatePresentationFont = (event) => {
    console.log(event.target.value);
  }

  const fontFamilies = [];
  defaultFontFamilies.forEach((fontFamily, i) => {
    fontFamilies.push(
      <option key={i} value={fontFamily} style={{ fontFamily }}>
        {fontFamily}
      </option>
    )
  })

  return (
    <div className={"row mx-0 mt-3 text-white rounded px-3 pb-5"}>
      <p className="col-12 p-0">Color palette</p>
      <div className="col-12 p-0 branding_color_palette_dropdown">
        <div onClick={() => setDropdownOpened(!dropdownOpened)} style={{ width: "100%" }}>
          <select disabled className="form-control form-control-lg bg-white">
            <option>Sunset</option>
          </select>
        </div>
        {
          dropdownOpened &&
          <div className="branding_color_palette border">
            Here are some colors
        </div>
        }
      </div>

      <div className="branding_active_color_palette row col-12 mx-0 mt-3 p-0">
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
        <div className="col-2 p-0 branding_color_circle_container">
          <div className="branding_active_color_circle" style={{ backgroundColor: 'red' }}></div>
        </div>
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
        <div className="col-9 d-flex align-items-center">
          Show logo
        </div>
        <div className="col-3 position-static pt-1">
          <div className="custom-control custom-switch">
            <input checked={logoUploadOpened} onChange={showLogo} type="checkbox" className="custom-control-input cursor-pointer" id="tmp" />
            <label className="custom-control-label" htmlFor="tmp"></label>
          </div>
        </div>
        {
          logoUploadOpened &&
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
        }
      </div>
      <hr style={{ border: "lightgray solid 1px", width: "100%", opacity: ".4" }} />
      <div className={"row col-12 mx-0 my-3 p-0 "}>
        <div className="col-12">Presentation font</div>
        <select onChange={updatePresentationFont} className="form-control form-control-lg">
          {fontFamilies}
        </select>
      </div>
    </div >
  )
}