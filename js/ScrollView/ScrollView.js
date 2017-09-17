/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Emoji  from 'react-native-emoji';


  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });



  const ACCESS_TOKEN = 'access_token';

export default class SampleMenu extends Component {
  constructor(props) {
    super(props);
    //definition of listview datasource
    this.state = {
      //this code use for simple list view
      //dataSource: ds.cloneWithRows(data_array),
      //this code use for listview with sectionHeader
      //dataSource: ds.cloneWithRowsAndSections(data_array),
      //filter_string:'',
      happiness:0,
      text:""
    };
  }
  componentWillMount() {
    this.getToken();
  }
  getToken = async () => 
    {
        try 
        {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if(!accessToken) 
            {
                console.log("Token not set");
            } 
            else 
            {
                //this.verifyToken(accessToken)
                console.log("getting token from storage");
                console.log(accessToken);
                return(accessToken);
            }
        } 
        catch(error) 
        {
            console.log("Something went wrong");
        }
    } 
  
  pressOne = () => {
    this.setState({happiness:1});
  }

  pressTwo = () => {
    this.setState({happiness:2});
  }

  pressThree = () => {
    this.setState({happiness:3});
  }

  pressFour = () => {
    this.setState({happiness:4});
  }

  pressFive = () => {
    this.setState({happiness:5});
  }

  pressSix = () => {
    this.setState({happiness:6});
  }

  alert = () => {
    Alert.alert(
      'Message Received',
      'My Alert Msg',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
    this.props.navigator.push({
      index: 2
  });

  }

  submit = () => {
    setTimeout(()=>this.alert(), 3000);
  }

  deleteRow(rowId)
  {
    let index = data_array.indexOf(rowId);
    if(index>-1)
    {
      data_array.splice(index, 1);
    }
    this.setState({dataSource:ds.cloneWithRows(data_array)});
  }
  _handleSwipeout(sectionID, rowID) {
  for (var i = 0; i < data_array.length; i++) 
  {
    if (i != rowID) data_array[i].active = false
    else data_array[i].active = true
  }
  this._updateDataSource(data_array)
  }
  _updateDataSource(data) 
  {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
  })
  }
  _renderRow(rowData,sectionId,rowId)
  {
      let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteRow(rowData) }
    }];
    return(
      <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor= 'transparent'>
              <TouchableHighlight 
              onPress={() => {
                if(data_array[rowId] == "Me")
                {
                  //render map of self location
                  this.props.navigator.push({index: 1});
                }
                  /* this is sample to show alert when you click on item
                  Alert.alert(
                    'Enter title here..',
                    'You click on '+rowData,
                  );
                  */
              }}>
                <View style={styles.row}>
                  <Text style={styles.row_style}>{rowData}</Text>
                </View>
              </TouchableHighlight>
            </Swipeout>
    );

  }
  render() {

    return (
      <View style={styles.Container}>
        <View style={styles.title}>
        <Text style={styles.submit}>Please choose the Emoji that best describes your mental state:</Text>
          </View>
        <View style={styles.Container2}>
        <TouchableOpacity style={styles.emoji}
          onPress={this.pressOne.bind(this)}>
          <Text style={styles.signupText}><Emoji name="grin"/></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emoji}
          onPress={this.pressTwo.bind(this)}>
          <Text style={styles.signupText}><Emoji name="smile"/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emoji}
          onPress={this.pressThree.bind(this)}>
          <Text style={styles.signupText}><Emoji name="relaxed"/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emoji}
          onPress={this.pressFour.bind(this)}>
          <Text style={styles.signupText}><Emoji name="disappointed"/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emoji}
          onPress={this.pressFive.bind(this)}>
          <Text style={styles.signupText}><Emoji name="cry"/></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emoji}
          onPress={this.pressSix.bind(this)}>
          <Text style={styles.signupText}><Emoji name="sob"/></Text>
        </TouchableOpacity>
        </View>
        <View style={styles.Container3}>
          <TextInput
          style={{height: 120, borderColor: 'white', borderWidth: 1, color: '#fff',paddingHorizontal:10}}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          placeholder="Please enter your message here :)"
          placeholderTextColor="white"
          value={this.state.text}/>
        </View>
        <View style={styles.Container4}>
          <TouchableOpacity style={styles.buttonSubmit}
            onPress={this.submit.bind(this)}>
          <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#34495e',
    flexDirection: 'column'
  },
  Container2: {
    flex: 0.5,
    backgroundColor: '#34495e',
    flexDirection: 'row'
  },
  Container3: {
    flex: 1,
    backgroundColor: '#34495e',
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  title: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow:1,
    justifyContent: 'center'
  },
  Container4: {
    flex: 0.5,
    backgroundColor: '#34495e',
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
  listview_header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  listview_style: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#34495e',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
  },
  row_style: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    color: '#fff'
  },
  separator_style: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#fff',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  loginText: {
    justifyContent: 'flex-start'
},
signupText: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    fontSize: 40,
},
emoji: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
},
buttonSubmit: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
},
submit: {
  color: 'white',
  paddingHorizontal: 10,
  justifyContent: 'flex-end',
}
});