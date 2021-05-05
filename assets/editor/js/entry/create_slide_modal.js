class create_slide_modal {
    constructor() {
        this.el = document.getElementById("create_slide_modal")
    }

    close() {
        $(this.el).modal('hide');
    }
    open() {
        $(this.el).modal('show');
    }
}

export default new create_slide_modal();