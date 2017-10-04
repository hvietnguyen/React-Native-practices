// Import necessarily libraries
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
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
      <KeyboardAvoidingView style={styles.container}>
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
      </KeyboardAvoidingView>
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
// Movies Screen
class Movies extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      totalPage:0,
      page:1,
      movies:null
    };
    this.onPress = this.onPress.bind(this);
    this.urlApi = "https://api.themoviedb.org/3/discover/movie?api_key=984ffdb6bbfba05afdce139853bf2a1c";
  }

  getMoviesByPage=(page)=>{
    fetch(this.urlApi+"&language=en-US&sort_by=popularity.desc&page="+page)
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson.results);
        //set states
        this.setState({
          totalPages:responseJson.total_pages,
          page:responseJson.page,
          movies:responseJson.results,
        });
      }).catch((error)=>{
        console.error(error);
      });
  }

  componentDidMount(){
    this.getMoviesByPage(this.state.page);
  }

  static navigationOptions={
    title:'Movies'
  }

  onPress=(item)=>{
    console.log("Movie: "+item.title);
    this.props.navigation.navigate('MovieDetails', item);
  }

  moveBackward=(page)=>{
    console.log('Next Page: '+page);
    this.getMoviesByPage(page);
  }

  moveForward=(page)=>{
    console.log('Next Page: '+page);
    this.getMoviesByPage(page);
  }

  renderItem=({item})=>(
    <ListItem
      id={item.id}
      onPress={()=>this.onPress(item)}
      title={'Title: ' + item.title}
      release_date={'Release: '+item.release_date}
      overview={'Overview: '+item.overview}
    />
  );

  renderHeader=()=>(
    <Text style={styles.label}>List of Movies</Text>
  );

  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.movies}
          renderItem={this.renderItem}
          keyExtractor={item=>item.id}
          ListHeaderComponent={this.renderHeader}
        />
        <Paging
          page={this.state.page}
          totalPages={this.state.totalPages}
          moveBackward={this.moveBackward.bind(this)}
          moveForward={this.moveForward.bind(this)}
        />
      </View>
    );
  }
}

// List Item
class ListItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('./img/movie.png')} style={{width:50,height:50}}></Image>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{this.props.release_date}</Text>
          </View>
        </View>
        <Text style={styles.overview} numberOfLines={4}>{this.props.overview}</Text>
      </TouchableOpacity>
    );
  }
}
//-----------------End Movies------------------------------------------------

// Movie Details

class MovieDetails extends React.Component{

  constructor(props){
    super(props);
    this.state={
      id:0,
      collection:null,
      genres:null,
      homepage:'',
      companies:null,
      countries:null,
      status:'',
      vote_average:0,
      videos:null
    };
    this.urlApi='https://api.themoviedb.org/3/movie/';
  }

  getMovieById=(id)=>{
    console.log('Movie: '+id);
    fetch(this.urlApi + id + '?api_key=984ffdb6bbfba05afdce139853bf2a1c&append_to_response=videos,images')
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson);
        //set states
        this.setState({
          id:responseJson.id,
          collection:responseJson.belongs_to_collection,
          genres:responseJson.genres,
          homepage:responseJson.homepage,
          companies:responseJson.production_companies,
          countries:responseJson.production_countries,
          status:responseJson.status,
          vote_average:responseJson.vote_average,
          videos:responseJson.videos.results
        });
      }).catch((error)=>{
        console.error(error);
      });
  }

  movieId=0;

  componentDidMount=()=>{
    this.getMovieById(movieId);
  }

  static navigationOptions=({navigation})=>{
    console.log('Get movie Id');
    movieId = navigation.state.params.id;
    return {title:'Movie Details'};
  };

  getNames=(arr)=>{
    let value='';
    if(arr!=null){
      value=arr[0].name;
      for(var i=1; i<arr.length; i++){
        value+=', '+arr[i].name;
      }
    }
    return value;
  }

  render(){
    const {params} = this.props.navigation.state;
    let url = {uri:'https://image.tmdb.org/t/p/w500'+params.poster_path};
    return(
      <ScrollView style={styles.container}>
          <Text style={styles.label}>{params.title}</Text>
          <View style={styles.row}>
            <Image source={url} style={{width:150, height:225}}/>
            <View style={styles.details}>
              <Text style={styles.title}>Collection: </Text><Text numberOfLines={2} style={styles.text}>{this.state.collection?this.state.collection.name:''}</Text>
              <Text style={styles.title}>Genres: </Text><Text numberOfLines={2} style={styles.text}>{this.getNames(this.state.genres)}</Text>
              <Text style={styles.title}>Companies: </Text><Text numberOfLines={2} style={styles.text}>{this.getNames(this.state.companies)}</Text>
              <Text style={styles.title}>Countries: </Text><Text numberOfLines={2} style={styles.text}>{this.getNames(this.state.countries)}</Text>
              <Text style={styles.title}>Status: </Text><Text style={styles.text}>{this.state.status}</Text>
              <Text style={styles.title}>Vote average: </Text><Text style={styles.text}>{this.state.vote_average}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Homepage: </Text>
              <Text style={styles.overview}>{this.state.homepage}</Text>
              <Text style={styles.title}>{this.state.videos&&this.state.videos.length>0?this.state.videos[0].type:'Trailer'}: </Text>
              <Text style={styles.overview}>{this.state.videos&&this.state.videos.length>0?'https://www.youtube.com/watch?v='+this.state.videos[0].key:''}</Text>
              <Text style={styles.title}>Overview: </Text>
              <Text style={styles.overview} numberOfLines={15}>{params.overview}</Text>
            </View>
          </View>
      </ScrollView>

    );
  }
}

//--------------------End Movie Details----------------------------------------


//-----------------Paging Component-------------------------------------
class Paging extends React.Component{
  constructor(props){
    super(props);
    this.moveBackward=this.moveBackward.bind(this);
    this.moveForward=this.moveForward.bind(this);
  }

  moveBackward=(page)=>{
    var p = Number.parseInt(page,10);
    if(p > 1){
        this.props.moveBackward(p-1);
        console.log('Current Page: '+p);
    }
  }

  moveForward=(page)=>{
    var p = Number.parseInt(page,10);
    var total = Number.parseInt(this.props.totalPages,10);
    if(p < total){
      this.props.moveForward(p+1);
      console.log('Current Page: '+p+'/'+total);
    }
  }

  render(){
    return(
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:5, backgroundColor:'steelblue'}}>
        {/* move backward button */}
        <View style={{borderRadius:40}}>
          <TouchableOpacity onPress={()=>this.moveBackward(this.props.page)}>
            <View>
              <Image source={require('./img/back-arrow.png')} style={{width:40, height:40}}></Image>
            </View>
          </TouchableOpacity>
        </View>

        {/* text display current page/totalpage */}
        <Text style={{color:'#ffffff', fontWeight:'bold'}}>Page: {this.props.page}/{this.props.totalPages}</Text>

        {/* move fordward button */}
        <View style={{borderRadius:40}}>
          <TouchableOpacity onPress={()=>this.moveForward(this.props.page)}>
            <View>
              <Image source={require('./img/forward-arrow.png')} style={{width:40, height:40}}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
//--------------------End Paging Component--------------------------------


// Tab Navigator - tab screen contain Home and Movies tabs
const TabScreen = TabNavigator({
  HomeTab:{screen:Home},
  MoviesTab:{screen:Movies}
});

// Stack Navigator - contain a login screen and a tab screen
const NavigatingScreen = StackNavigator({
    Login:{screen:Login},
    Tabs:{screen:TabScreen},
    MovieDetails:{screen:MovieDetails}
  },
  {
    headerMode:'none' // Hide header
  }
);


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
    justifyContent:'center',
    alignItems:'stretch',
    marginTop:10,
    left:5,
  },

  column:{
    flexDirection:'column',
    margin:5,
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

  details:{
    flexDirection:'column',
    marginLeft:5,
  },

  title: {
    padding:0,
    marginTop:5,
    fontSize: 16,
    fontWeight:'bold',
    height: 20,
    color:'#ffffff',
  },

  subTitle: {
    padding: 0,
    margin:0,
    fontSize: 12,
    height: 20,
    color:'#ffffff',
    opacity:0.5
  },

  text:{
    color:'#ffffff',
    fontSize:12,
    width:200,
  },

  overview: {
    paddingLeft: 5,
    marginBottom:5,
    fontSize: 12,
    color:'#ffffff',
  },
});

AppRegistry.registerComponent('NavigatingScreen',()=>NavigatingScreen);
