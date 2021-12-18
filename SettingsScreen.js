import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View , TouchableOpacity} from 'react-native';

import { Button, CheckBox, ListItem } from 'react-native-elements';

function SettingsScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); //Hide-Show Completed
  const [lowHigh, setLowHigh] = useState(false); //Sort Priority

  const list = [
    {
      title: (isCompleted) ? 'Show Completed' : 'Hide Completed',
      onPress: () => { setIsCompleted(!isCompleted); setIsVisible(false) }
    },
    {
      title: (lowHigh) ? 'Sort Priority Low to High' : 'Sort Priority High to Low',
      onPress: () => { setLowHigh(!lowHigh); setIsVisible(false) }
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.arrow_box}>
        <Text style={{fontSize:30, color:'white'}}>
          Settings
        </Text>
      </View>
      <View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.section}>
          <View style={styles.h2Container}>

            <Text style={styles.h2}>
              Notifications
            </Text>
          </View >

          <Text style={styles.paragraph}>
            Turning on notifications will enable daily notifications informing you of today's tasks.

          </Text>
          
          <TouchableOpacity style={[styles.orange_button,  { marginTop:20}]}>
           <Text style={styles.orange_button_text}>Turn On</Text>
          </TouchableOpacity>  

        </View>
        <View style={styles.section}>

          <View style={[styles.h2Container, {marginTop:40}]}>

            <Text style={styles.h2}>
              My Profile
            </Text>
          </View>

          <Text style={styles.paragraph}>
            You have been a member since 2021
          </Text>
          <TouchableOpacity style={[styles.grey_button, { marginTop:20}]}>
           <Text style={[styles.grey_button_text]}>Change Password</Text>
          </TouchableOpacity>  

          <TouchableOpacity style={[styles.grey_button, {marginTop:20, backgroundColor:'gray'}]}>
           <Text style={[styles.grey_button_text, {color:'white'}]}>Log Out</Text>
          </TouchableOpacity>  


        </View>
      </View>

    
    </View>

  );
}
const styles = StyleSheet.create({
  h1Container: {
    width: '100%',
    height: 63,

    backgroundColor: '#4285F4',
    justifyContent: 'center'
  },

  h1: {
    backgroundColor: '#4285F4',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 25,
  },

  section: {
    paddingBottom: 40,
    justifyContent:'center',
    alignItems: 'center'
  },

  orange_button: {
    backgroundColor: '#ff6b4d',
    borderRadius: 10,
    height: 40, 
    justifyContent: 'center',
    width: '75%'

  },

  orange_button_text:{
    color: 'white',
    fontSize: 16,
    textAlign:'center'

  },

  grey_button:{
    backgroundColor: '#eeeeeeff',
    borderRadius: 10,
    height: 40, 
    justifyContent: 'center',
    width: '75%'

  },

  grey_button_text:{
    color: 'black',
    fontSize: 16,
    textAlign:'center',

  },

  h2Container: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    justifyContent:'center',
    width: '100%'
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
    alignItems: 'center',
    

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
    padding: 5
  },
  listItemText: {
    flex: 0.7,
    fontSize: 18
  },
  listItemButtons: {
    flex: 0.2,
    flexDirection: 'row',
    color: '#ff6b4d'
  },
  listItemNone: {
    display: 'none',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
  ,  
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


export default SettingsScreen;