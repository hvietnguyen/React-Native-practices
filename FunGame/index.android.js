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
    // State
    this.state={
      rowBaseNumber: Math.floor(Math.random() * 4),
      totalScore:0};
    //Refresh display mole in row base
    setInterval(()=>{
      this.setState(getRowBaseNumber=>{
        //random number from 1-3
        let randomNumber = Math.floor(Math.random() * 4);
        return {rowBaseNumber: randomNumber};
      });
    },2000);
    // Update score
    setInterval(()=>{
        let total = this.refs.rb0.state.score + this.refs.rb1.state.score + this.refs.rb2.state.score + this.refs.rb3.state.score;
        this.setState({totalScore:total});
    },1000);
  }

  // Render row base
  renderRowBase=()=>{
    rowBases=[];
    for(let i=0; i<4; i++){
      let selected = i==this.state.rowBaseNumber;
      rowBases.push(
        <RowBase
          ref={'rb'+i}
          key={i}
          id={i+1}
          selected={selected}
        />
      );
    }
    return rowBases;
  }

  render() {
    let imgPathGround=require('./background2.jpg');
    return (
      <Image source={imgPathGround} style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topScore}>Score: {this.state.totalScore}</Text>
        </View>
        {this.renderRowBase()}
      </Image>
    );
  }
}

/*
* Component
* Array of bases in horizontal
*/
class RowBase extends Component{
  constructor(props){
    super(props);
    // Properties
    this.props.selected = true;
    //State
    this.state={score:0};
  }

  updateScore = (point)=>{
    this.setState({score:this.state.score + point});
  }

  // render multiple bases regarding to randomNumber
  renderBase = () => {
    bases=[];
    // random number from 0-4
    let randomBase = Math.floor(Math.random() * 4);
    for(let i=0; i<4; i++){
      let loadingMole = i==randomBase && this.props.selected ? 'true' : 'false';
      let source = loadingMole=='true' ? require('./mole.png') : require('./mole_hole2.png');
      bases.push(
        <Base
          key={i}
          id={this.props.id.toString()+(i+1)}
          imgSource={source}
          isPressOn='false'
          isLoading={loadingMole}
          updateRowBaseScore={this.updateScore.bind(this)}
        />
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
* Component:
* Base of Display
*/
class Base extends Component{
  constructor(props){
    super(props);
    this.state={
      id:0,
      isPressOn:'false',
      isLoading:'false',
      imgSource:null};
  }

  // Events
  componentWillMount(){
    this.setState({
      id:this.props.id,
      isPressOn:this.props.isPressOn,
      isLoading: this.props.isLoading,
      imgSource:this.props.imgSource});
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      id:nextProps.id,
      isPressOn:nextProps.isPressOn,
      isLoading: nextProps.isLoading,
      imgSource:nextProps.imgSource});
  }

  onPress=()=>{
    this.setState({isPressOn:'true'});
    if(this.state.isLoading=='true'){
        this.props.updateRowBaseScore(10);
    }else{
        this.props.updateRowBaseScore(-2);
    }
  }

  render(){
    return(
      // <View style={styles.base}></View>
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <View style={styles.base}>
          <Image source={this.state.imgSource} style={{width:100,height:78}}></Image>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  top:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#ffffff',
    opacity:0.4
  },
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-around',
    width:null,
    height:null
  },
  base:{
    width:100,
    height:100,
    borderRadius:40,
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
  topScore: {
    color:'#333333',
    fontSize: 18,
    fontWeight:'bold',
    textAlign: 'center',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FunGame', () => FunGame);
