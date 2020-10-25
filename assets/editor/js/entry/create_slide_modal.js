class create_slide_modal {
    constructor() {
        this.el = document.getElementById("create_slide_modal")
    }

    close() {
        $(this.el).modal('hide');
        document.getElementById("entry_clear_content").click();
    }
}

export default new create_slide_modal();