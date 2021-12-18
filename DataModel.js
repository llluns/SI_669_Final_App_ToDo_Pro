import { firebaseConfig } from './Secrets';
import { initializeApp, getApps } from 'firebase/app';
import {
    initializeFirestore, collection,
    getDocs, query, orderBy, limit,
    where, doc, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot,
    Timestamp
} from "firebase/firestore";

let app;
if (getApps().length == 0) {
    app = initializeApp(firebaseConfig);
}
const db = initializeFirestore(app, {
    useFetchStreams: false
});
class DataModel {
    constructor() {
        let x = new Date()
        x.setUTCHours(0,0,0,0)
        this.date = x
    }

    updateDate(date) {
        this.date = date;
    }

    currentDate() {
        return this.date
    }

    getDB() {
        return db
    }
}
let theDataModel;

export function getDataModel() {
    if (!theDataModel) {
        theDataModel = new DataModel();
    }
    return theDataModel;
}