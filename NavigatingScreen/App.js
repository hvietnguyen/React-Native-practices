// Import necessarily libraries
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';


// Login Screen
class Login extends React.Component{
  constructor(props){
    super(props);
    // State
    this.state={
      userName:'',
      password:''
    };
  }

  // Nav options can be defined as a function of the screen's props:
  static navigationOptions={
    title:'Login'
  };

  _onPress=()=>{
    if(this.state.userName=='vietnguyen' && this.state.password=='Se83Vi84'){
      this.props.navigation.navigate('Tabs',{
        authorised:'true',
        userName:this.state.userName,
        password:this.state.password,
      });
    }else{
      Alert.alert('Login is invalid!');
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.caption}>
          <Text style={styles.captionText}>Login</Text>
        </View>
        <View style={styles.loginForm}>
          <View style={styles.row}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.input}>
              <TextInput style={{height:40, width:200}} placeholder="Enter Username"
              onChangeText={(text)=>this.setState({userName:text})}/>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.input}>
              <TextInput style={{height:40, width:200}} placeholder="Enter Password"
              onChangeText={(text)=>this.setState({password:text})} secureTextEntry={true}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button color='#841584' onPress={this._onPress.bind(this)} title='Login' />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//-------------End Login------------------------------------------------

// Home Screen
class Home extends React.Component{

  constructor(props){
    super(props);
  }

  static navigationOptions=({navigation})=>({
    // title:`Welcome ${navigation.state.params!=undefined?navigation.state.params.userName:''}`
    title:'Home'
  });

  // componentDidMount(){
  //   console.log(this.props.navigation.state);
  //   if(this.props.navigation.state!=undefined){
  //     this.props.navigation.navigate('Login');
  //   }
  // }

  render(){
    const {params} = this.props.navigation.state;
    return(
      <View style={styles.container}>
        <Text style={styles.label}>Welcome {params!=undefined?params.userName:''}!</Text>
        <Text style={{color:'#ffffff'}}>Autorised status: {params!=undefined && params.authorised=='true'?'Successful':'Failed'}!</Text>
      </View>
    );
  }
}

//----------------End Home-------------------------------------------------

class Movies extends React.Component{
  constructor(props){
    super(props);
    this.state = {totalPage:0,movies:null};
    this._onPress = this._onPress.bind(this);
    this.uriApi = "https://api.themoviedb.org/3/discover/movie?api_key=984ffdb6bbfba05afdce139853bf2a1c&language=en-US&sort_by=popularity.desc&page=1";
  }

  componentDidMount(){
    return fetch(this.uriApi)
      .then((response)=>response.json())
      .then((responseJson)=>{
        let data = responseJson.results;
        console.log(data);
        //set states
        this.setState({
          totalPages:responseJson.total_pages,
          movies:data
        });
      }).catch((error)=>{
        console.error(error);
      });
  }

  static navigationOptions={
    title:'Movies'
  }

  _onPress=(item)=>{
    Alert.alert("Overview: "+item.overview);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>List of Movies</Text>
        <FlatList
          data={this.state.movies}
          renderItem={
            ({item})=>
            <TouchableOpacity onPress={()=>this._onPress(item)}>
              <View style={{flexDirection:'row'}}>
                <Image source={require('./img/movie.png')} style={{width:50,height:50}}></Image>
                <View style={{flexDirection:'column'}}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text style={styles.text}>Release: {item.release_date}</Text>
                </View>
              </View>
              <Text style={styles.overview} numberOfLines={4}>Overview: {item.overview}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

//-----------------End Movies------------------------------------------------

// Tab Navigator - tab screen contain Home and Movies tabs
const TabScreen = TabNavigator({
  HomeTab:{screen:Home},
  MoviesTab:{screen:Movies}
});

// Stack Navigator - contain a login screen and a tab screen
const NavigatingScreen = StackNavigator({
  Login:{screen:Login},
  Tabs:{screen:TabScreen},
});


// Styles
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'steelblue',
  },
  loginForm:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  row:{
    flexDirection:'row',
    marginTop:10,
  },
  caption:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:25,
    marginBottom:25,
  },
  captionText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:28,
    padding:10,
    color:'#ffffff'
  },
  label:{
    textAlign:'center',
    fontWeight:'bold',
    padding:5,
    fontSize:20,
    color:'#ffffff',
  },
  input:{
    borderRadius:10,
    borderColor:'#030303',
    borderWidth:0.5,
    backgroundColor:'#ffffff'
  },
  buttonContainer:{
    margin:10,
  },

  text: {
    padding: 0,
    margin:0,
    fontSize: 12,
    height: 20,
    color:'#ffffff',
  },

  title: {
    padding:0,
    marginTop:5,
    fontSize: 16,
    fontWeight:'bold',
    height: 20,
    color:'#ffffff',
  },

  overview: {
    padding: 0,
    marginBottom:5,
    fontSize: 12,
    color:'#ffffff',
  },
});

AppRegistry.registerComponent('NavigatingScreen',()=>NavigatingScreen);
