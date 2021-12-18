import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//Page
import { getDataModel } from './DataModel';
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

// Elements
import { Button, CheckBox, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

// Firebase
import {
  initializeFirestore, collection,
  getDocs, query, orderBy, limit,
  where, doc, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot,
  Timestamp
} from "firebase/firestore";
let snapshotUnsubscribe = undefined;

export default function HomeScreen({ navigation, route }) {
  let DataModel = getDataModel()
  const db = DataModel.getDB()

  let currentDate = DataModel.currentDate()

  const [todoList, setTodoList] = useState([]);
  const [today, setToday] = useState(currentDate)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Get data
  function subscribeToSnapshot() {
    if (snapshotUnsubscribe) {
      snapshotUnsubscribe();
    }
    const q = query(collection(db, 'finalproject_items'), where("date", "<", Timestamp.fromDate(tomorrow)), where("date", ">=", Timestamp.fromDate(today)))
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
  }, [today]);

  return (
    <View style={styles.container}>
      <View style={styles.arrow_box}>
        <TouchableOpacity
          onPress={() => {
            setToday(new Date(yesterday));
            DataModel.updateDate(yesterday)
          }}>
          <Icon name="chevron-left" color="white" />

        </TouchableOpacity>

        <Text style={styles.main_date}> {currentDate.toDateString()} </Text>

        <TouchableOpacity onPress={() => {
          setToday(new Date(tomorrow))
          DataModel.updateDate(tomorrow)
        }}
        >
          <Icon name="chevron-right" color="white" />

        </TouchableOpacity>


      </View>
      <View style={styles.listContainer}>
      

        <View style={styles.threeButtons}>

          <TouchableOpacity style={styles.grey_button_small}>
            <Text style={styles.grey_button_text}>Day View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.grey_button_small, {marginLeft: 20}]}
            onPress={() => {
              navigation.navigate("Calendar");
            }}>
            <Text style={styles.grey_button_text}> Month View</Text>

          </TouchableOpacity>
        </View>
        

        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={todoList}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <CheckBox
                  checked={item.checked}
                  checkedColor="darkgrey"
                  uncheckedColor="darkgrey"
                  checkedIcon='check-square'
                  uncheckedIcon='square'

                  onPress={() => {
                    updateDoc(doc(db, "finalproject_items", item.key), {
                      checked: !item.checked,
                    });
                  }}
                />
                <View style={styles.todoItem}>
                  <Text style={styles.listItemText}>{item.text}</Text>
                  <Text style={styles.listItemTextNotes}>{item.notes}</Text>
                </View>
                <View style={styles.listItemButtons}>
                  <Button
                    type="clear"
                  />
                  <Button
                    icon={<Icon name="edit" size={24} color="darkgrey" />}
                    type="clear"
                    onPress={() => {
                      navigation.navigate('Details', { title: 'Edit Task', item: item, db: db });
                    }}
                  />
                  <Button
                    icon={<Icon name="delete" size={24} color="darkgrey" />}
                    type="clear"
                    onPress={() => {
                      deleteDoc(doc(db, "finalproject_items", item.key));
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>


      <TouchableOpacity style={styles.orange_button}
        onPress={() => {
          navigation.navigate("Details", { title: 'Add Task'});
        }}>
        <Text style={styles.orange_button_text}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'column'
  },

  threeButtons: {
    flexDirection: 'row',

    justifyContent: 'center'
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
    justifyContent: 'flex-start',
  },
  listItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  listItemTextNotes: {
    flex: 0.7,
    fontSize: 18,
    color: 'darkgrey'
  },
  listItemText: {
    flex: 0.3,
    fontSize: 18,
  },
  main_date: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  },
  listItemButtons: {
    flex: 0.2,
    flexDirection: 'row',
  },
  listItemNone: {
    display: 'none',
    backgroundColor: 'red',
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

  grey_button_small: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: '33%'

  },

  grey_button_text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

  grey_button_big: {
    backgroundColor: '#eeeeeeff',
    borderRadius: 10,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    marginBottom: 20
  },

  orange_button: {
    backgroundColor: '#ff6b4d',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: '75%',
    marginBottom: 20


  },

  orange_button_text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'

  },

});
