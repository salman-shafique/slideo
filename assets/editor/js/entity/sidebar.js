import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import add_event from "Editor/js/utils/add_event";

export default function sidebar() {
    if (!(this instanceof sidebar)) return new sidebar(...arguments);

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
     * @param {string} id 
     */
    this.close = (id) => {
        let currActivePanel = select("#" + id.replace("Tool", "Panel"));
        currActivePanel.classList.add("collapse");
        select("#ActionsPanel").classList.add("closed");
        select("#MainPanel").classList.add("expanded");
        select("#" + id).classList.remove("active-tool");
    }

    /**
     * 
     * @param {string} id 
     */
    this.open = (id) => {
        // Open new tab
        let newActivePanel = select("#" + id.replace("Tool", "Panel"));

        let allPanels = selectAll(".action-panel");
        allPanels.forEach(e => e.classList.add("collapse"));
        newActivePanel.classList.remove("collapse");

        select("#ActionsPanel").classList.remove("closed");
        select("#MainPanel").classList.remove("expanded");

        if (select(".active-tool"))
            select(".active-tool").classList.remove("active-tool");
        select("#" + id).classList.add("active-tool");
    }

}

