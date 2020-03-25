import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

import { Auth } from 'aws-amplify';
import {AuthenticationContext} from "./contexts/authentication"

export default function SignInPage (){
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    user: {},
    isAuthenticated: false,
  });

  const {setAuthentication} = useContext(AuthenticationContext)

  const onChangeText= (key, value) => {
      setUserInfo({...userInfo, [key]: value})
  };

  const signIn = () => {
    console.log(userInfo.username, userInfo.password)
    Auth.signIn(userInfo.username, userInfo.password)
    .then(user => {
        setUserInfo({...userInfo, user: {user}, isAuthenticated: true});
        setAuthentication(true);
    })
    .then(() => {
      console.log(userInfo.isAuthenticated)
    })
    .catch(err => console.log('error', err))
  } ;
    return (
      <View style={styles.container}>
      
        <TextInput
        onChangeText={value=> onChangeText('username', value)}
        style={styles.input}
        placeholder='username'
        />
        <TextInput
        onChangeText={value=> onChangeText('password', value)}
        secureTextEntry={true}
        style={styles.input}
        placeholder='password'
        />
        <Button title='sign in' onPress={signIn}/>
      </View>
    );
  }

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    margin: 10

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});