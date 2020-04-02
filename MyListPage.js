import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';


import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

export default function MyList() {

  // States
  const [enteredItem, setEnteredItem] = useState('');
  const [desiredItems, setDesiredItems] = useState([]);
  const [fetchedItems, setFetcheditems] = useState([]);
  const [isItLoading, setIfItsLoading] = useState(true);
  const [searchbarState, setSearchBarState] = useState({
    search: ''
  });

  const componentDidMount = () => {
    fetchItems();
  }

  // Get function for the items
  const fetchItems = async () => {
    try {
      const response = await fetch('http://18.189.32.71:3000/items/')
      await response.json()
      .then((data) => {
        //setFetcheditems(data);
        data.map((item) =>{
          delete item._id;
          delete item.DESCRIPTION;
          setFetcheditems(fetchedItems => [...fetchedItems, item]);
          console.log(item);
        })
        setIfItsLoading(false);
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  
  // Searchbar function handlers
  const itemInputHandler = (textEntered)=> {
    setEnteredItem(textEntered);
  };

  const addItemHandler = () =>{
    setDesiredItems(currentItems => [...desiredItems, enteredItem]);
  };

    if (isItLoading === true) {
      componentDidMount();
      return (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator />
        </View>
      );
    }
  return (
    <View style={styles.screen}>
      <View>
      <SearchBar
      onChangeText={itemInputHandler} 
      value={enteredItem}
          onChangeText={text => SearchFilterFunction(text)}
          onClear={text => SearchFilterFunction('')}
          placeholder="Type Here..."
          />
      </View>
      <ScrollView>
        {fetchedItems.map((item)=> 
        <View style={styles.itemList} key={item.NAME}> 
        <Text> Name: {item.NAME}  </Text> 
        <Text> Brand: {item.MANUFACTURER} </Text> 
        <Button title='Add'/>
        </View>
         )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 60
  },
  inputContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  input:{
    borderBottomColor: 'black',
   borderBottomWidth: 1, 
   padding: 10, 
   width: '80%' 
  }, 
  itemList:{
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,   
    marginVertical: 10
  }
});
