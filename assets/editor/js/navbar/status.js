class status {
    constructor() {
        this.el = document.getElementById("status_msg");
    }

    update(msg) {
        if (this.el)
            this.el.innerText = msg;
    }
}

export default new status();