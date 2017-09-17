/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements'



  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });



  const ACCESS_TOKEN = 'access_token';

    const messages = [
  "Hello1",
  "Hello2",
  "Hello3",
  "Hello4",
  "Hello5"
  ];

export default class EncourageSomeone extends Component {
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
      text:"",
      submitted: false,
    };
  }
  componentWillMount() {
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

  alert = () => {
    Alert.alert(
      'Message Sent!',
      'The person will get your message very soon! :)',
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
    if(!this.state.submitted){
      this.setState({submitted: true})
      setTimeout(()=>this.alert(), 3000);
    }
  }
  getRandomInt() {
    return Math.floor(Math.random() * (4 - 0 + 1));
  }
  render() {
    return (
      <View style={styles.Container}>
      <View style={styles.ContainerHeader}>
        <Icon
        size={32}
        name='chat'
        color='#00b764'
        containerStyle={{position: "absolute", left:5}}
      />
      <Text style={styles.header}>This person needs your help</Text>
      </View>
       <View style={styles.Container2}>
        <Text style={styles.sadMessage}>{messages[this.getRandomInt()]}</Text>
      </View>
        <View style={styles.Container3}>
        <TextInput
          underlineColorAndroid='transparent'
          style={{color: '#9d9d9d', marginTop: 5, fontSize: 18, backgroundColor: "#e6e7ea", height:80}}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          placeholder="Enter your message here"
          placeholderTextColor="#9d9d9d"
          value={this.state.text}/>
        </View>
        <View style={styles.Container4}>
          <TouchableOpacity
            onPress={this.submit.bind(this)}>
              <Button
              borderRadius={5}
              large={true}
              fontWeight="bold"
              fontSize={20}
              backgroundColor="#377df6"
              title="Submit"
              />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "black",
    marginLeft: 40,
    fontSize: 21
  },
  sadMessage: {
    margin: 10,
    fontSize: 20,
    color: "#000000"
  },
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  ContainerHeader: {
    flex: 0.1,
    marginTop: 20
  },
  Container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  Container3: {
    flex: 0.25,
    flexDirection: 'column',
    paddingHorizontal: 5
  },
  Container4: {
    marginTop: 10,
    flex: 0.3,
    backgroundColor: '#FFFFFF',
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow:1,
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
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 30,
    justifyContent: 'flex-start'
},
signupText: {
    color: '#fff',
    fontWeight: '700',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
},
});