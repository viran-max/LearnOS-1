import { db } from "./config";

import {addDoc,collection,getDocs,deleteDoc,doc,updateDoc,getDoc} from "firebase/firestore";

import storyModel from "../models/AiHub/storyModel";

const DBName = "stories"
class storyService{

    async submitStory(payload){
        let newStory = new storyModel();

        newStory.lessonId = payload.lessonId;
        newStory.title = payload.title;
        newStory.content = payload.content;
        newStory.storyImage = payload.storyImage;
        newStory.storyOrder = payload.storyOrder;
        newStory.status = payload.status;

        const docRef = await addDoc(collection(db,DBName), {...newStory})

        return docRef;
    }

    async getAll() {
        const querySnapshot = await getDocs(collection(db, DBName));
        let stories = [];

        querySnapshot.forEach((doc) => {
            stories.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return stories;
    }

    async getByLessonId(lessonId){
        const all = await this.getAll();
        return all.filter((story) => story.lessonId === lessonId);
    }

    async deleteStory(id){
        const docRef = doc(db,DBName,id);
        await deleteDoc(docRef);
    }

    async singleStory(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id: docSnap.id,...docSnap.data()}
        } else {
            return false;
        }
    }

    async updateStory(payload,id){
        const storyRef = doc(db,DBName,id);
        return await updateDoc(storyRef,payload);
    }
}

export default new storyService;