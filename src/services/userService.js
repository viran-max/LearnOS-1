import { auth, db } from "./config";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import authModel from "../models/authModel";
import authService from "./authService";

const DBName = "users";

class userService{

    async register(payload){

        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

        const userId = userCredential.user.uid;

        let newUser = new authModel();
        newUser.id = userId;
        newUser.fullName = payload.fullName;
        newUser.email = payload.email;
        newUser.mobile = payload.mobile;
        newUser.userType = 2;

        await setDoc(doc(db, DBName, userId), {...newUser});

        return userCredential;
    }

    async login(payload){

        const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);

        const docRef = doc(db, DBName, userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            throw new Error("User record not found in database");
        }

        const userData = docSnap.data();

        let sessionData = {
            id: userCredential.user.uid,
            fullName: userData.fullName,
            email: userData.email,
            userType: userData.userType,
        };

        authService.setData(sessionData);

        return sessionData;
    }

}

export default new userService;