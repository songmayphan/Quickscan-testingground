import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import {ListContext} from "./contexts/itemlist"

export default function List({ navigation }) {

    const {setList, List} = useContext(ListContext)

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    //const [list, setList] = useState([]);
  
    const addItem = (item) => {
      setList([...List, item]);
      console.log('item added', item)
    }
  
    useEffect(() => {
      fetch('http://18.189.32.71:3000/items/')
        .then((response) => response.json())
        .then((json) => { 
          json.map((item) =>{
            delete item.DESCRIPTION;
            item.QUANTITY = 0;
          })
          setData(json)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    });
  
    return (
      <View style={styles.screen}>
        <View>
            <SearchBar
              placeholder="Type Here..."
            />
        <TouchableOpacity onPress={() => navigation.navigate('Compare')} style={styles.button} >
            <Text>Continue</Text>
        </TouchableOpacity>
          </View>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            removeClippedSubviews={true}
            keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
              <View style={styles.itemList} >
                <Text>Item: {item.NAME}</Text>
                <Text>Manufacturer: {item.MANUFACTURER}</Text>
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity onPress={()=> {addItem(item)}} style={styles.button} >
                    <Text>Add Item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  };


const styles = StyleSheet.create({
    screen: {
      padding: 40
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    input: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding: 10,
      width: '80%'
    },
    itemList: {
      padding: 10,
      backgroundColor: '#ccc',
      borderColor: 'black',
      borderWidth: 1,
      marginVertical: 10,
      flexDirection: 'column'
    },
    addButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      alignItems: 'center'
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }
  });