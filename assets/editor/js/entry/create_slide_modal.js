class create_slide_modal {
    constructor() {
        this.el = document.getElementById("create_slide_modal")
    }

    close() {
        $(this.el).modal('hide');
    }
}

export default new create_slide_modal();