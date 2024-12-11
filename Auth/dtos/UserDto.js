module.exports = class UserDto{
    email;
    login;
    id;
    isActivated;
    role;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.login = model.login;
        this.isActivated = model.isActivated;
        this.role = model.role;
    }
}