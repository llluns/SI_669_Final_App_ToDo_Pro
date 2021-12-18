import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from "moment";
import { getDataModel } from './DataModel';
// Firebase
import {
  initializeFirestore, collection,
  getDocs, query, orderBy, limit,
  where, doc, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot,
  Timestamp
} from "firebase/firestore";
let snapshotUnsubscribe = undefined;

export default function CalendarScreen({navigation}) {
  let DataModel = getDataModel()
  const db = DataModel.getDB()
  let today = new Date()
  const [todoList, setTodoList] = useState([]);
  // Get data
  function subscribeToSnapshot() {
    if (snapshotUnsubscribe) {
      snapshotUnsubscribe();
    }
    const q = query(collection(db, 'finalproject_items'))
    snapshotUnsubscribe = onSnapshot(q, (qSnap) => {
      let newList = [];
      qSnap.docs.forEach((docSnap) => {
        let Lst = docSnap.data();
        Lst.key = docSnap.id;
        newList.push(Lst);
      });
      setTodoList(newList);
    });
  }
  useEffect(() => {
    subscribeToSnapshot();
  }, []);

  function getmarkedDates(list) {
    let checkedItems = []
    let uncheckedItems = []
    for (const item of list) {
      try {
        if (item.checked == true) {
          let date = moment(item.date.toDate()).format('YYYY-MM-DD')
          checkedItems.push(date)
        }
        else {
          let date = moment(item.date.toDate()).format('YYYY-MM-DD')
          uncheckedItems.push(date)
        }

      }
      catch (error) {
        console.log('not ok', item.date)
      }

    }
    let u_checked = checkedItems.filter((v, i, a) => a.indexOf(v) === i);
    let u_unchecked = uncheckedItems.filter((v, i, a) => a.indexOf(v) === i);
    let d = {}
    for (let date of u_checked) {
      dateobject = new Date(date)
      if (dateobject <= today) {
        d[date] = { "selected": true, "selectedColor": "#75da63ff" }
      }
      else{
        d[date] = { "selected": true, "selectedColor": 'gray' }
      }
    }
    for (let date of u_unchecked) {
      dateobject = new Date(date)
      if (dateobject <= today) {
        d[date] = { "selected": true, "selectedColor": "#ed6363ff" }
      }
      else{
        d[date] = { "selected": true, "selectedColor": 'gray' }
      }
    }
    return d
    // return { '2021-12-15': { "marked": true, "dotColor": 'red' } }
  }



  return (
    <View>
      <Calendar
        current={DataModel.currentDate().toDateString()}
        onDayPress={(day) => {
          DataModel.updateDate(new Date(day.timestamp));
          console.log('from calendar', DataModel.currentDate())
          navigation.push("Home")
        }}
        markedDates={getmarkedDates(todoList)} />
    </View>
  );
}

