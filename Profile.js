import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the profile</Text>
        <Text>Yo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});