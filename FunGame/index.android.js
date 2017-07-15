/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Image
} from 'react-native';

export default class FunGame extends Component {
  constructor(props){
    super(props);
    this.state={refreshing:false};
  }

  render() {
    let imgPath=require('./background.jpg');
    return (
      <Image source={imgPath} style={styles.container}>
        <RowBase id='1' />
        <RowBase id='2'/>
        <RowBase id='3'/>
        <RowBase id='4'/>
        <RowBase id='5'/>
      </Image>
    );
  }
}

/*
* Array of bases in horizontal
*/
class RowBase extends Component{
  constructor(props){
    super(props);
    this.state = {numberBase: Math.floor(Math.random() * 5) + 1};
    this.props.id='';

    //Refresh bases
    setInterval(()=>{
      this.setState(getNumberBase=>{
        // random number from 1-5
        let randomNumber = Math.floor(Math.random() * 5) + 1;
        return {numberBase: randomNumber};
      });
    },2000);
  }
  // Arrow function:
  // render multiple bases regarding to randomNumber
  renderBase = () => {
    const bases=[];
    for(let i=0; i<this.state.numberBase; i++){
      bases.push(
        <Base key={i} id={this.props.id + (i+1)}/>
      );
    }
    return bases;
  }

  render(){
    return(
      <View style={styles.rowBase} >
        {this.renderBase()}
      </View>
    );
  }
}

/*
* Base of Display
*/
class Base extends Component{
  constructor(props){
    super(props);
    this.props.id='';
  }

  onPress(){
    Alert.alert('You press me: '+this.props.id);
  }

  render(){
    return(
      // <View style={styles.base}></View>
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <View style={styles.base}>
          {/* <Text style={styles.buttonText}>Refresh</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-around',
    width:null,
    height:null
  },
  base:{
    backgroundColor:'white',
    width:50,
    height:50,
    opacity:0.5
  },
  rowBase:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  button:{
    marginBottom:30,
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:20,
    opacity:0.5
  },
  buttonText:{
    padding:20,
    color:'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FunGame', () => FunGame);
