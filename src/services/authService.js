import { signOut } from "firebase/auth";
import { auth } from "./config";

class authService {

    setData(data){
        localStorage.setItem("id", data.id);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userType", data.userType);
    }

    getId(){
        return localStorage.getItem("id");
    }

    getFullName(){
        return localStorage.getItem("fullName");
    }

    getEmail(){
        return localStorage.getItem("email");
    }

    getUserType(){
        return localStorage.getItem("userType");
    }

    isLoggedIn(){
        return this.getEmail() !== null;
    }

    logout(){
        localStorage.clear();
        signOut(auth);
    }
}

export default new authService;