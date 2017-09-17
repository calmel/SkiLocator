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
  Navigator,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements'

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
    const messages = [
  "I just had a miscarriage. I feel so miserable. It was my first one too....",
  "My words are never heard. I have no one to talk to. My friends are always hanging out without me.",
  "Think I got food poisoning yesterday night, and my bowels are just on a roll. It wont stop coming out!"
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
      randomInt: Math.floor(Math.random() * (3))
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
      setTimeout(()=>this.alert(), 200);
    }
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
        <Text style={styles.sadMessage}>{messages[this.state.randomInt]}</Text>
      </View>
        <View style={styles.Container3}>
        <TextInput
          underlineColorAndroid='transparent'
          style={{color: '#9d9d9d', marginTop: 5, fontSize: 18, backgroundColor: "#e6e7ea", height:80}}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          placeholder="Enter your message here"
          placeholderTextColor="#9d9d9d"
          value={this.state.text}
          blurOnSubmit={true}/>
        </View>
        <View style={styles.Container4}>
          <Button
          borderRadius={5}
          large={true}
          fontWeight="bold"
          fontSize={20}
          backgroundColor="#377df6"
          title="Submit"
          onPress={this.submit.bind(this)}
          />
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
buttonSubmit: {
  marginTop: 30
},
});