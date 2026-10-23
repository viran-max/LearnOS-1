import { db } from "./config";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import userProgressModel from "../models/AiHub/userProgressMode"
const DB_NAME = "userProgress";
class userProgressService{

    async getAll(){
        const querySnapshot = await getDocs(collection(db, DB_NAME));
        let progress = []

        querySnapshot.forEach((doc)=>{
            progress.push({id: doc.id, ...doc.data()});
        })
        return progress;
    }

    async getByUser(userId){
        const q = query(collection(db, DB_NAME), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        let progress = []

        querySnapshot.forEach((doc)=>{
            progress.push({id: doc.id, ...doc.data()});
        })
        return progress;
    }

    async markComplete(payload){

        const q = query(
            collection(db, DBName),
            where("userId", "==", payload.userId),
            where("lessonId", "==", payload.lessonId)
        );
        const existingSnap = await getDocs(q);
        if(!existingSnap.empty){
            return { id: existingSnap.docs[0].id, ...existingSnap.docs[0].data() };
        }

        let newProgress = new userProgressModel();
        newProgress.userId = payload.userId;
        newProgress.chapterId = payload.chapterId;
        newProgress.lessonId = payload.lessonId;

        const docRef = await addDoc(collection(db, DBName), {...newProgress});
        return docRef;
    }

}

export default new userProgressService;