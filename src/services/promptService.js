import { db } from "./config";

import {addDoc, collection, getDocs,deleteDoc,doc, updateDoc,getDoc} from "firebase/firestore";

import promptModel from "../models/PromptModel/promptModel";

const DBName = "prompts"
class promptService{
    
    async submitPrompt(payload){
        let newPrompt = new promptModel();

        newPrompt.title = payload.title;
        newPrompt.category = payload.category;
        newPrompt.Difficulty = payload.Difficulty;
        newPrompt.shortDescription = payload.shortDescription;
        newPrompt.bestFor = payload.bestFor;
        newPrompt.whenToUse = payload.whenToUse;
        newPrompt.expectedOutput = payload.expectedOutput;
        newPrompt.bestWayToUse = payload.bestWayToUse;
        newPrompt.fullPromptText = payload.fullPromptText;
        newPrompt.promptImage = payload.promptImage;
        const docRef = await addDoc(collection(db,DBName),{...newPrompt})

        return docRef;
    }

    async getAll(){
        const querySnapshot = await getDocs(collection(db,DBName));
        let prompts = []

        querySnapshot.forEach((doc)=>{
            prompts.push({id:doc.id, ...doc.data()});
        })
        return prompts;
    }

    async deletePrompt(id){
        const docRef = doc(db,DBName,id)
        await deleteDoc(docRef);
    }

    async singlePrompt(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id : docSnap.id,...docSnap.data()}
        } else {
            alert("No Such Document");
            return false;
        }
    }

    async updatePrompt(payload,id){
        const promptRef = doc(db,DBName,id);
        return await updateDoc(promptRef,payload);
    }


}

export default new promptService;