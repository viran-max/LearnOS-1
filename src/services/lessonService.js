import { db } from "./config";

import {addDoc, collection, getDocs,deleteDoc,doc, updateDoc,getDoc} from "firebase/firestore";

import lessonModel from "../models/AiHub/lessonModel";

const DBName = "lessons"
class lessonService{

    async submitLesson(payload){
        let newLesson = new lessonModel();

        newLesson.chapterId = payload.chapterId;
        newLesson.heading = payload.heading;
        newLesson.description = payload.description;
        newLesson.mainContent = payload.mainContent;
        newLesson.status = payload.status;
        newLesson.lessonImage = payload.lessonImage;
        newLesson.lessonOrder = payload.lessonOrder;

        const docRef = await addDoc(collection(db,DBName),{...newLesson})

        return docRef;
    }

    async getAll(){
        const querySnapshot = await getDocs(collection(db,DBName));
        let lessons = []

        querySnapshot.forEach((doc)=>{
            lessons.push({id:doc.id, ...doc.data()});
        })
        return lessons;
    }

    async getByChapterId(chapterId){
        const all = await this.getAll();
        return all.filter((lesson)=>lesson.chapterId === chapterId);
    }

    async deleteLesson(id){
        const docRef = doc(db,DBName,id)
        await deleteDoc(docRef);
    }

    async singleLesson(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id : docSnap.id,...docSnap.data()}
        } else {
            return false;
        }
    }

    async updateLesson(payload,id){
        const lessonRef = doc(db,DBName,id);
        return await updateDoc(lessonRef,payload);
    }

}

export default new lessonService;