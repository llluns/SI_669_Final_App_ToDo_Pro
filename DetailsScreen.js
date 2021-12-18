import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import { getDataModel } from './DataModel';
import moment from "moment";

// Firebase
import {
  initializeFirestore, collection,
  getDocs, query, orderBy, limit,
  where, doc, addDoc, deleteDoc, updateDoc, getDoc, onSnapshot,
  Timestamp
} from "firebase/firestore";

export default function DetailsScreen({ navigation, route }) {
  let DataModel = getDataModel()
  let db = DataModel.getDB()
  let currentDate = DataModel.currentDate()
  let item = route.params ? route.params.item : null;
  let editMode = (item != null);
  const [inputText, setInputText] = useState(item ? item.text : '');
  const [checked, setChecked] = useState(item ? item.checked : false);
  const [notes, setNotes] = useState(item ? item.notes : '');
  const [date, setDate] = useState(item ? new Date(moment(item.date.toDate()).format("YYYY-MM-DD")) : new Date(currentDate));
  const [modalVisible, setModalVisible] = useState(false);
  const [repeat, setRepeat] = useState(item ? item.repeats : 'never')
  const [repeatedTasks, setRepeatedTasks] = useState(item ? item.repeatedTasks : [])
  console.log(repeat)
  return (
    <View >
      <View style={[{ alignItems: 'center', marginTop: 40 }]} >
        <Input
          containerStyle={[styles.inputBox, { marginBottom: 40 }]}
          placeholder="New Todo Item"
          onChangeText={text => setInputText(text)}
          value={inputText}
        />

        {/* <View style={{flex:1, marginTop:30, marginBottom:30}}> */}
        <CheckBox
          checked={checked}
          checkedColor="darkgrey"
          uncheckedColor="darkgrey"
          checkedIcon='check-square'
          uncheckedIcon='square'
          onPress={() => {
            setChecked(!checked);
          }}
        />
        {/* </View> */}
        <TouchableOpacity style={styles.notes_box}>

          <TextInput
            containerStyle={styles.notesBox}
            placeholder="Add Notes Here"
            onChangeText={(text) => setNotes(text)}
            value={notes} />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>Repeat Task: </Text>

                <TouchableOpacity style={styles.grey_button_small} onPress={() => {
                  setRepeat('daily')
                  console.log(repeat)
                }}>
                  <Text style={styles.grey_button_text}>Daily</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.grey_button_small} onPress={() => {
                  setRepeat('weekly')
                  console.log(repeat);
                }}>
                  <Text style={styles.grey_button_text}>Weekly</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.grey_button_small} onPress={() => {
                  setRepeat('monthly')
                  console.log(repeat);

                }}>
                  <Text style={styles.grey_button_text}>Monthly</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.grey_button_small} onPress={() => {
                  setRepeat('annually')
                  console.log(repeat);
                }}>
                  <Text style={styles.grey_button_text}>Annually</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.orange_button, { width: '75%' }]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={[styles.grey_button_text, { color: 'white' }]}>Save</Text>
                </TouchableOpacity>


              </View>



              {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}> */}

            </View>
          </Modal>
        </View>
        <TouchableOpacity style={styles.grey_button_small} onPress={() => setModalVisible(true)}>
          <Text style={styles.grey_button_text}>Repeat Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orange_button} onPress={() => {
          if (editMode) {
            updateDoc(doc(db, "finalproject_items", item.key), {
              text: inputText,
              checked: checked,
              date: date,
              notes: notes,
              repeat: repeat,
            });
          } else {
            if (repeat == 'daily') {
              var yearLater = new Date();
              yearLater.setFullYear(yearLater.getFullYear() + 1)
              var daysOfYear = [];
              for (var d = new Date(); d <= yearLater; d.setDate(d.getDate() + 1)) {
                daysOfYear.push(new Date(d));
              }
              for (let d of daysOfYear) {
                addDoc(collection(db, "finalproject_items"), {
                  text: inputText,
                  checked: checked,
                  date: d,
                  notes: notes,
                  repeat: repeat
                });
              }
            }
            else if (repeat == 'weekly') {
              var yearLater = new Date();
              yearLater.setFullYear(yearLater.getFullYear() + 1)
              var daysOfYear = [];
              for (var d = new Date(); d <= yearLater; d.setDate(d.getDate() + 7)) {
                daysOfYear.push(new Date(d));
              }
              for (let d of daysOfYear) {
                addDoc(collection(db, "finalproject_items"), {
                  text: inputText,
                  checked: checked,
                  date: d,
                  notes: notes,
                  repeat: repeat
                });
              }
            }
            else if (repeat == 'monthly') {
              var yearLater = new Date();
              yearLater.setFullYear(yearLater.getFullYear() + 1)
              var daysOfYear = [];
              for (var d = new Date(); d <= yearLater; d.setMonth(d.getMonth() + 1)) {
                daysOfYear.push(new Date(d));
              }
              for (let d of daysOfYear) {
                addDoc(collection(db, "finalproject_items"), {
                  text: inputText,
                  checked: checked,
                  date: d,
                  notes: notes,
                  repeat: repeat
                });
              }
            }
            else if (repeat == 'yearly') {
              var yearLater = new Date();
              yearLater.setFullYear(yearLater.getFullYear() + 1);
              addDoc(collection(db, "finalproject_items"), {
                text: inputText,
                checked: checked,
                date: date,
                notes: notes,
                repeat: repeat
              });
              addDoc(collection(db, "finalproject_items"), {
                text: inputText,
                checked: checked,
                date: yearLater,
                notes: notes,
                repeat: repeat
              });
            } else {
              addDoc(collection(db, "finalproject_items"), {
                text: inputText,
                checked: checked,
                date: date,
                notes: notes,
                repeat: repeat,
              });
            }
          };
          navigation.navigate("Home");
        }}>
          <Text style={styles.orange_button_text}>{editMode ? "Save" : "Add Item"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.grey_button_small, { backgroundColor: 'gray' }]} onPress={() => {
          navigation.navigate("Home");
        }}>
          <Text style={[styles.grey_button_text, { color: 'white' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>

    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    flex: 0.1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },

  inputBox: {
    flex: 0.8,
    width: '95%',
    alignItems: 'center'

  },
  notes_box: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    height: '30%',
    width: '75%',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonArea: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    backgroundColor: 'tan'
  },
  button: {
    width: '40%'
  },
  notesBox: {
    height: '20%',
    backgroundColor: 'white',
    borderBottomColor: 'darkgrey',
    marginBottom: 20,
  },

  grey_button_small: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    marginBottom: 20
  },

  grey_button_text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
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
  centered: {
    alignItems: 'center'
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});