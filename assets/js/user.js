
function userClass() {
    if (!(this instanceof userClass)) return new userClass(...arguments);

    this.inited = false;
    this.loadUser = () => {
        const user = document.querySelector("user");
        if (user) {
            this.userId = user.getAttribute("user-id");
            if (this.userId)
                this.userId = parseInt(this.userId);
            this.sessionId = user.getAttribute("session-id");
            this.inited = true;
        } else {
            setTimeout(this.loadUser, 50);
        }
    }
    if (!this.inited)
        this.loadUser();

}
const user = new userClass();

export default user;