import { db } from "./config";

import {addDoc, collection, getDocs,deleteDoc,doc, updateDoc,getDoc} from "firebase/firestore";

import journeyModel from "../models/journeys/journeyModel";

const DBName = "journeys";
class journeyService{

    async submitJourney(payload){
        let newJourney = new journeyModel();

        newJourney.journeyTitle = payload.journeyTitle;
        newJourney.hookLine = payload.hookLine;
        newJourney.journeyDescription = payload.journeyDescription;
        newJourney.coverImage = payload.coverImage;
        newJourney.status = payload.status;
        newJourney.submittedBy = "admin";
        newJourney.submittedByName = "Admin";
        newJourney.approvalStatus = "approved";

        const docRef = await addDoc(collection(db,DBName), {...newJourney})

        return docRef;
    }

    // called from the user-facing Submit Journey form
    async submitUserJourney(payload){
        let newJourney = new journeyModel();

        newJourney.journeyTitle = payload.journeyTitle;
        newJourney.hookLine = payload.hookLine;
        newJourney.journeyDescription = payload.journeyDescription;
        newJourney.coverImage = payload.coverImage;
        newJourney.status = "Published"; // becomes visible automatically once approved
        newJourney.submittedBy = payload.userId;
        newJourney.submittedByName = payload.userName;
        newJourney.approvalStatus = "pending";

        const docRef = await addDoc(collection(db,DBName), {...newJourney})

        return docRef;
    }

    async getAll(){
        const querySnapshot = await getDocs(collection(db,DBName));
        let journeys = []

        querySnapshot.forEach((doc)=>{
            journeys.push({id:doc.id, ...doc.data()});
        })
        return journeys;
    }

     async getByUserId(userId){
        const all = await this.getAll();
        return all.filter(((journey)=>journey.submittedBy===userId));
    }

    async singleJourney(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id : docSnap.id,...docSnap.data()}
        } else {
            return false;
        }
    }

    async updateJourney(payload,id){
        const journeyRef = doc(db,DBName,id);
        payload.updatedAt = Date.now();
        return await updateDoc(journeyRef,payload);
    }

    async deleteJourney(id){
        const docRef = doc(db,DBName,id)
        await deleteDoc(docRef);
    }

    async approveJourney(id){
        const journeyRef = doc(db,DBName,id);
        return await updateDoc(journeyRef, { approvalStatus: "approved" });
    }

    async rejectJourney(id){
        const journeyRef = doc(db,DBName,id);
        return await updateDoc(journeyRef, { approvalStatus: "rejected" });
    }


}

export default new journeyService;