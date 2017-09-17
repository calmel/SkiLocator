import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Alert, Navigator, AsyncStorage, ActivityIndicator} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {Keyboard} from 'react-native'
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

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    SubmitLogin = () => {
        //encourage someone
        this.props.navigator.push({
            index: 3
        });
    }

   SubmitSignUp = () => {
       //be encouraged
        this.props.navigator.push({
        index: 2
        });
    }

    vibes = () => {
        this.props.navigator.push({
            index: 5
            });
    }

   render() {
            return (
            <View style = {styles.container}>

                <View style={styles.logo}>
                    <Icon
                      size={150}
                      name='chat'
                      color='#ffffff'
                    />
                    <Text style={styles.mainText} h1>Smile<Emoji name="grin"/></Text>
                </View>


                <View style={styles.buttonBar}>
                    <Button
                    borderRadius={5}
                    large={true}
                    fontWeight="bold"
                    fontSize={20}
                    backgroundColor="#377df6"
                    onPress={this.SubmitLogin.bind(this)}
                    title="I want to encourage someone"
                    />
                </View>
                 <View style={styles.buttonBar}>
                    <Button
                    borderRadius={5}
                    fontWeight="bold"
                    fontSize={20}
                    large={true}
                    backgroundColor="#377df6"
                    onPress={this.SubmitSignUp.bind(this)}
                    title="I want to be encouraged"
                    />
                </View>
                <View style={styles.buttonBar}>
                    <Button
                    borderRadius={5}
                    fontWeight="bold"
                    fontSize={20}
                    large={true}
                    backgroundColor="#377df6"
                    onPress={this.vibes.bind(this)}
                    title="Positive Vibes"
                    />
                </View>
            </View>
            );
        }
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logo: {
        marginTop: 50,
        marginBottom: 50
    },
    buttonBar: {
        marginTop: 30
    },
    mainText: {
        textAlign: 'center',
        marginTop: 30,
        color: "#ffffff"
    }
});

