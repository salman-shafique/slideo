import React from "react";
import ReactDOM from "react-dom";
import toastr from "Editor/js/components/toastr";

function ContactUsForm() {
    const contactUs = (event) => {
        document.querySelector('#contact_us_modal button[data-dismiss="modal"]').click();
        toastr.info("Your message has been sent!","Thanks for your feedback!");
        setTimeout(() => {
            event.target.reset();
        }, 1000);
    }

    return (
        <form className="rtl" id="contact_us_form" onSubmit={contactUs} action="/contactUs" method="POST" target="tmp_iframe">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="text" name="fullname" className="form-control" placeholder="שם מלא*" required />
                </div>
                <div className="form-group col-md-6">
                    <input type="email" name="email" className="form-control" placeholder="אימייל*" required />
                </div>
                <div className="form-group col-12">
                    <input type="text" name="subject" className="form-control" placeholder="נושא" />
                </div>
            </div>
            <div className="form-group">
                <textarea className="form-control" name="content" rows="3" placeholder="מוזמנים לשתף אותנו בכל הערה, רעיון או הצעה!" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary float-right">שלח הודעה</button>
        </form>
    )
}


ReactDOM.render(<ContactUsForm />, document.getElementById("ContactUsForm"))