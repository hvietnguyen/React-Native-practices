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
  Text,
  TextInput,
  Image
} from 'react-native';

export default class ImageDemoWithProps extends Component {
  constructor(props){
    super(props);
    this.arrCaptions = ['Bananas','Dog on the grass'];
    this.state={captions:this.arrCaptions};
  }

  handleChange(text){
    this.arrCaptions[0] = text;
    this.setState({
      captions:this.arrCaptions
    });
  }

  handleChange2(text){
    this.arrCaptions[1] = text;
    this.setState({
      captions:this.arrCaptions
    });
  }

  render() {
    var uriPath = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    var imgPath = require('./image.png');
    var background = require('./background.jpg');
    var paths = [];
    paths.push(uriPath);
    paths.push(imgPath);

    return (
      <View style={styles.container}>
        <Image source={background} style={styles.imageBackGround}>
          <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              {/* TextInput: Caption 1 */}
              <Text style={{fontWeight:'bold',textAlign:'auto', color:'white'}}>Caption 1:</Text>
              <TextInput style={{height:60, width:250, paddingLeft:10, borderColor:'white'}}
                 placeholder='Type caption here' onChangeText={this.handleChange.bind(this)}/>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              {/* TextInput: Caption 2 */}
              <Text style={{fontWeight:'bold',textAlign:'auto', color:'white'}}>Caption 2:</Text>
              <TextInput style={{height:60, width:250, paddingLeft:10, borderColor:'white'}}
                placeholder='Type caption here' onChangeText={this.handleChange2.bind(this)}/>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={uriPath} style={styles.image} />
            <BlinkCaption caption={this.arrCaptions[0]} />
          </View>
          {/* Refresh Images */}
          <RefreshImages arrPath={paths} arrCap={this.arrCaptions} style={styles.caption, styles.instructions} />
        </Image>
      </View>

      // <Image source={{
      //   uri:'https://facebook.github.io/react/img/logo_og.png',
      //   method:'Post',
      //   headers:{
      //     Pragma:'no-cache'
      //   },
      //   body:'Facebook logo request from source site'
      // }}
      // style={{width:200,height:200}}/>
    );
  }
}

// Caption
class BlinkCaption extends Component{
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.caption : '';
    return (
      <Text style={styles.caption, styles.instructions}>{display}</Text>
    );
  }
}

// Refresh Images
class RefreshImages extends Component{
  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.paths = this.props.arrPath;
    this.caps = this.props.arrCap;
    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return {index: previousState.index < this.paths.length-1 ? ++previousState.index : 0};
      });
    }, 2000);
  }

  render() {
    let path = this.paths[this.state.index];
    let caption = this.caps[this.state.index];
    let style = this.props.style;

    return (
      <View style={styles.imageContainer}>
        <Image source={path} style={styles.image}></Image>
        <Text style={style}>{caption}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackGround:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width:null,
    height:null
  },

  imageContainer:{
    width:200,
    height:150,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'steelblue',
    marginTop:5
  },

  image: {
    width:193,
    height:110,
    marginTop: 5,
    marginBottom:5,
  },

  caption:{
    fontWeight:'bold',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ImageDemoWithProps', () => ImageDemoWithProps);
