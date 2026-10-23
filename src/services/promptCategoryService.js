import { db } from "./config";

import {addDoc,collection,getDocs,deleteDoc,doc,updateDoc,getDoc} from "firebase/firestore";

import promptCategoryModel from "../models/PromptModel/promptCategoryModel";

const DBName = "promptCategories"
class promptCategoryService{

    async submitCategory(payload){
        let newCategory = new promptCategoryModel();

        newCategory.name = payload.name;
        newCategory.description = payload.description;
        newCategory.categoryImage = payload.categoryImage;
        newCategory.status = payload.status;

        const docRef = await addDoc(collection(db,DBName), {...newCategory})

        return docRef;
    }

    async getAll() {
        const querySnapshot = await getDocs(collection(db, DBName));
        let categories = [];

        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return categories;
    }

    async deleteCategory(id){
        const docRef = doc(db,DBName,id);
        await deleteDoc(docRef);
    }

    async singleCategory(id){
        const docRef = doc(db,DBName,id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return {id: docSnap.id,...docSnap.data()}
        } else {
            return false;
        }
    }

    async updateCategory (payload,id){
        const categoryRef = doc(db,DBName,id);
        return await updateDoc(categoryRef,payload);
    }
}

export default new promptCategoryService;