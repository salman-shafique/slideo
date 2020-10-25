class status {
    constructor() {
        this.el = document.getElementById("status_msg");
    }

    update(msg) {
        this.el.innerText = msg;
    }
}

export default new status();