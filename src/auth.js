class Auth{
    constructor(){
        if(Auth.instance instanceof Auth){
            return Auth;
        }
        this.authenticated ={
            version: Math.floor(Math.random() * 4000),
            value: 'false',
        };
        Object.freeze(this.authenticated);
        Object.freeze(this);
        Auth.instance = this;
    }
    login(){
        this.authenticated.value = true;
    }
    logout(){
        this.authenticated.value = false;
    }
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();