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
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements'
import Emoji  from 'react-native-emoji';
// This is a manual function that allows replacing routes with animations
Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);
  
    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
      routeStack: nextStack,
      sceneConfigStack: nextAnimationConfigStack,
    }, () => {
      this._enableScene(destIndex);
      this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
        this.immediatelyResetRouteStack(replacedStack);
      });
    });
  };

export default class Receiving extends Component {
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
      message:""
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
        {text: 'OK', onPress: () => this.props.navigator.replaceWithAnimation({
          index: 0
      })},
      ],
      { cancelable: false }
    );
    

  }

  submit = () => {
    if(!this.state.submitted){
      this.setState({submitted: true})
      this.alert()
      }
  }
  render() {

    return (
      <View style={styles.Container}>
        <View style={styles.title}>
        <Text style={styles.submit}>Please choose the Emoji that best describes your mental state:</Text>
          </View>
        <View style={styles.Container2}>
          <Text style={styles.signupText}>{this.state.message}</Text>
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
          title="OK"
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