import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Button, CheckBox, BottomSheet, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { fonts } from 'react-native-elements/dist/config';
import { getDataModel } from './DataModel';

import { useIsFocused } from '@react-navigation/native';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};
import {
  initializeFirestore, collection,
  getDocs, query, orderBy, limit,
  where, doc, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot,
  Timestamp
} from "firebase/firestore";
let snapshotUnsubscribe = undefined;

let snapshotUnsubscribe1 = undefined;



export default function AnalyticsScreen({ route }) {
  let DataModel = getDataModel()
  const db = DataModel.getDB()
  const [todoList, setTodoList] = useState([]);
  const [todoList1, setTodoList1] = useState([]);
  const [percent, setPercent]=useState(calcPercent(todoList))
  const [dateFrom, setDateFrom]=useState(weekAgo)

  // // GET DATES FOR THIS PAST WEEK
  //   const [today, setToday] = useState(new Date(currentDate))
  //   const weekAgo = new Date(today)
  //   weekAgo.setDate(weekAgo.getDate() -7)

  let today = new Date()

  let weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  let monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 30)



  function subscribeToSnapshot() {
    if (snapshotUnsubscribe) {
      snapshotUnsubscribe();
    }
    const q = query(collection(db, 'finalproject_items'),
      where("date", "<", Timestamp.fromDate(today)),

      // CHANGE WEEKAGO TO DATEFROM SO IT WORKS WITH THE BUTTONS??
      where("date", ">", Timestamp.fromDate(weekAgo)));
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

  function subscribeToSnapshot1() {
    if (snapshotUnsubscribe1) {
      snapshotUnsubscribe1();
    }
    const q1 = query(collection(db, 'finalproject_items'),
      where("date", "<", Timestamp.fromDate(today)),

      // CHANGE WEEKAGO TO DATEFROM SO IT WORKS WITH THE BUTTONS??
      where("date", ">", Timestamp.fromDate(monthAgo)));
      snapshotUnsubscribe1 = onSnapshot(q1, (qSnap1) => {
        let newList = [];
        qSnap1.docs.forEach((docSnap) => {
          let Lst = docSnap.data();
          Lst.key = docSnap.id;
          newList.push(Lst);
        });
        setTodoList1(newList);
      });
  }

  useEffect(() => {
    subscribeToSnapshot1();
  }, []);

  function calcPercent(list){
    let checked = 0;
    let total = 0
    for (const x of list){
      if (x.checked == true){
        checked +=1
      }
      total +=1
    }
    let percent = checked/total;
    if (percent == NaN){
      return 0
    }
    else{
      return Math.trunc(percent*100)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.arrow_box}>
        <Text style={{color:'white', fontSize:24}}>
          Completion Rate
        </Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.section}>
          <View style={styles.h2Container}>

            <Text style={styles.h2}>
              Percent Tasks Completed
            </Text>

          </View>

          <View style={styles.twoButtons}>
            <TouchableOpacity style={styles.grey_button_small} 
            onPress={() => {
              setDateFrom(weekAgo)
              setPercent(calcPercent(todoList))
              console.log(dateFrom)
            }}
            >
            <Text style={styles.grey_button_text}>This Week</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.grey_button_small} 
            onPress={() => {
              setDateFrom(monthAgo);
              setPercent(calcPercent(todoList1))
              console.log(dateFrom)
            }}
            >
              <Text style={styles.grey_button_text}>This Month</Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.percent}>
            {percent}%
          </Text>

          
        </View>
        
      </View>

    </View>

  );
}
const styles = StyleSheet.create({

  twoButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  percent: {
    color: '#ff6b4d',
    fontSize: 130,
    padding: 20,
    textAlign: 'center'
    

  },

  h1Container: {
    width: '100%',
    height: 63,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center'
  },

  h1: {
    backgroundColor: '#F3F3F3',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 25,
  },

  section: {
    paddingBottom: 40
  },

  orange_button: {
    color: '#ff6b4d'
  },
  h2Container: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },

  h2: {
    fontSize: 25,


  },

  paragraph: {
    paddingTop: 10,
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,

  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    flex: 0.8,
    padding: 30,
    width: '100%',
  },
  listContentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
  listItemText: {
    flex: 0.7,
    fontSize: 18
  },
  listItemButtons: {
    flex: 0.2,
    flexDirection: 'row',
  },
  listItemNone: {
    display: 'none',
    backgroundColor: 'red',
  },

  grey_button_small: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginLeft:10,
    marginTop:20,
    height: 40,
    justifyContent: 'center',
    width: '33%'

  },

  grey_button_text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

  arrow_box: {
    flex: .07,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b4d',
    width: '100%',
    height: 30
  },

});