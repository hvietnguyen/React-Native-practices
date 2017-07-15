/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  //StyleSheet,
  Text,
  View
} from 'react-native';

export default class HelloWorld extends Component {
  render() {
    return (
      <View>
        <Text>Hello World!</Text>
        <Text>Viet Nguyen (David)</Text>
      </View>

      /* <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to my first React Native Android
        </Text>
        <Text style={styles.instructions}>
          Hello World!
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View> */
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#5C9FE8',
//   },
//   welcome: {
//     fontSize: 25,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
/* The AppRegistry just tells React Native which component is the root one for
the whole application*/
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
