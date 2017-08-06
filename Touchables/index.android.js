/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

export default class Touchables extends Component {
  constructor(props){
    super(props);
    this.state={movies:null};
    this._onPress = this._onPress.bind(this);
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.movies;
        this.setState({movies:data});
        console.log(responseJson.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // async function getMoviesFromApi() {
  //   try {
  //     let response = await fetch('https://facebook.github.io/react-native/movies.json');
  //     let responseJson = await response.json();
  //     return responseJson.movies;
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }

  _onPress=(item)=>{
    Alert.alert("Title: "+item.title+" - Release: "+item.releaseYear);
  }

  render() {
    // let urlImg = require('./img/icon.jpg');
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.movies}
          renderItem={
            ({item})=>
            <TouchableOpacity onPress={()=>this._onPress(item)}>
              <View style={styles.itemView}>
                <Image source={require('./img/movie.png')} style={{width:50,height:50}}></Image>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.item}>Title: {item.title}</Text>
                    <Text style={styles.item}>Release: {item.releaseYear}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 22,
  },

  item: {
    padding: 0,
    fontSize: 18,
    height: 44,
  },

  itemView:{
    flexDirection:'row',
  }
});

AppRegistry.registerComponent('Touchables', () => Touchables);
