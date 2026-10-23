import { db } from "./config";

import {addDoc,collection,getDocs,deleteDoc,doc,updateDoc,getDoc} from "firebase/firestore";

import chapterModel from "../models/AiHub/chapterModel";

const DBName = "chapters"
class chapterService{

    async submitChapter(payload){
        let newChapter = new chapterModel();

        newChapter.title = payload.title;
        newChapter.chapterNumber = payload.chapterNumber;
        newChapter.description = payload.description;
        newChapter.status = payload.status;
        newChapter.chapterImage = payload.chapterImage;

        const docRef = await addDoc(collection(db,DBName), {...newChapter})

        return docRef;
    }

    async getAll() {
    const querySnapshot = await getDocs(collection(db, DBName));
    let chapters = [];

    querySnapshot.forEach((doc) => {
        chapters.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return chapters;
}

    async deleteChapter(id){
        const docRef = doc(db,DBName,id);
        await deleteDoc(docRef);
    }

    async singleChapter(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id: docSnap.id,...docSnap.data()}
        } else {
            return false;
        }
    }

    async updateChapter (payload,id){
        const chapterRef = doc(db,DBName,id);
        return await updateDoc(chapterRef,payload);
    }
}

export default new chapterService;