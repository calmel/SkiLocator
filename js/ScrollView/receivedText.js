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
      <Text style={styles.header}>Someone sent you a message!</Text>

      </View>
        <Text style={styles.message}>
        Hey there! Just wanted to let you know that you are beautiful 
        just the way you are. Please don’t change yourself for anyone! 
        Keep up that confidence you got in you and stay awesome! Hope 
        you have a great day!
        </Text>
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
  message: {
    fontSize:20,
    margin: 10
  },
  header: {
    color: "black",
    marginLeft: 40,
    fontSize: 21,
  },

});