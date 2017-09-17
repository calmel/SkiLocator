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
import Emoji  from 'react-native-emoji';


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
      text:"",
      submitted: false
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
    if(!this.state.submitted){
      this.setState({submitted: true})
      setTimeout(()=>this.alert(), 3000);
      }
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
        underlineColorAndroid='transparent'
        style={{color: '#9d9d9d', marginTop: 5, fontSize: 18, backgroundColor: "#e6e7ea", height:200}}
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
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  Container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  Container3: {
    flex: 2,
    flexDirection: 'column',
    paddingHorizontal: 5
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  Container4: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
signupText: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    fontSize: 35,
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
  color: 'black',
  justifyContent: 'flex-end',
}
});