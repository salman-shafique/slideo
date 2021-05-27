import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import add_event from "Editor/js/utils/add_event";
import constants from "Editor/js/constants";
import session from "Editor/js/session";

function sidebarClass() {
    if (!(this instanceof sidebarClass)) return new sidebarClass(...arguments);

    this.init = () => {
        add_event(".tool", "click", (event) => {
            // Close current tab
            if (event.target.classList.contains("active-tool")) {
                this.close(event.target.getAttribute("id"));
                return;
            }

            // Open new tab
            this.open(event.target.getAttribute("id"));

        });

    }

    /**
     * 
     */
    this.closeAll = () => {
        const currActiveTab = select("#ToolsTray .tool.active-tool");
        if (!currActiveTab) return;
        const currActiveTablId = currActiveTab.getAttribute("id");
        const currActivePanelId = currActiveTablId.replace("Tool", "Panel");

        const currActivePanel = select("#" + currActivePanelId);
        currActivePanel.classList.add("collapse");
        select("#ActionsPanel").classList.add("closed");
        select("#MainPanel").classList.add("expanded");
        select("#" + currActiveTablId).classList.remove("active-tool");
    }

    // Citra's Code
    const addShapeTool = select("#AddShape_Tool").childNodes;
    const addButtonToggle = (opt) => {
        if(opt === "close"){
            addShapeTool.forEach(e => {
                if(e.tagName === "I"){
                    e.className = "fas fa-times-circle"
                }else{
                    e.innerHTML = "Close"
                } 
            })
            select("#AddShape_Tool").classList.add("active-tool")
        }else if(opt === "add") {
            if (select(".active-tool"))
            select(".active-tool").classList.remove("active-tool");
            const allPanels = selectAll(".action-panel");
            allPanels.forEach(e => e.classList.add("collapse"));
            addShapeTool.forEach(e => e.tagName === "I" ? e.className = "fas fa-plus-circle": e.innerHTML = "Add")
        }
    }

    /**
     * 
     * @param {string} id 
     */
    this.close = (id) => {
        const currActivePanel = select("#" + id.replace("Tool", "Panel"));
        currActivePanel.classList.add("collapse");
        select("#ActionsPanel").classList.add("closed");
        select("#MainPanel").classList.add("expanded");
        select("#" + id).classList.remove("active-tool");
        addButtonToggle("add")
    }

    /**
     * 
     * @param {string|number} id 
     */
    this.open = (id) => {
        if (typeof id == "number") {
            switch (id) {
                case constants.SHAPE_TYPES.AUTO_SHAPE:
                    id = "Shapes_Tool"
                    break;
                case constants.SHAPE_TYPES.ICON:
                    id = "Icons_Tool"
                    break;
                case constants.SHAPE_TYPES.IMAGE:
                    id = "Images_Tool"
                    break;
                case constants.SHAPE_TYPES.TEXTBOX:
                    id = "Text_Tool"
                    break;
                default:
                    id = "Design_Tool"
                    break;
            }
        }
        // Open new tab
        const newActivePanel = select("#" + id.replace("Tool", "Panel"));

        // const allPanels = selectAll(".action-panel");
        // allPanels.forEach(e => e.classList.add("collapse"));
        
        addButtonToggle("add")
        newActivePanel.classList.remove("collapse");

        newActivePanel.id !== "AddShape_Panel" ? select("#AddShape_Panel").classList.add("collapse") : null;

        if(newActivePanel.id === "AddShape_Panel"){
            select("#ActionsPanel").classList.add("closed")
            select("#MainPanel").classList.add("expanded")
        }else{
            select("#ActionsPanel").classList.remove("closed")
            select("#MainPanel").classList.remove("expanded")
        }
       

        if (select(".active-tool"))
            select(".active-tool").classList.remove("active-tool");
        select("#" + id).classList.add("active-tool");

        newActivePanel.id === "Images_Panel" || newActivePanel.id === "Icons_Panel" || newActivePanel.id === "Text_Panel"? addButtonToggle("close") : null;
        
    }

}

const sidebar = sidebarClass();

export default sidebar;