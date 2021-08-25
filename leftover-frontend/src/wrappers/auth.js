class Auth {
    constructor(){
        if (localStorage.isAuthenticated && JSON.parse(localStorage.isAuthenticated )) {
            this.authenticated = true;
            this.authorization = localStorage.authorizationGroup;
         }
        else{
            this.authenticated = false;
            this.authorization = null;
         }
    }

    login(authorizationGroup, cb){
        this.authenticated = true;
        localStorage.isAuthenticated = true;
        this.authorizationGroup = authorizationGroup;
        localStorage.authorizationGroup = authorizationGroup;
        console.log(`authorization group is ${this.authorizationGroup} && localstorage is ${localStorage.authorizationGroup}`)
        cb();
    }

    logout(cb){
        this.authenticated = false;
        localStorage.isAuthenticated = false;
        this.authorizationGroup = null;
        localStorage.authorizationGroup = null;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

    authorizationGroupIs(){
        return this.authorization;
    }
}

export default new Auth();