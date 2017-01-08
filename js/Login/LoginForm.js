import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Navigator} from 'react-native';

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
    constructor(props)
    {
        super(props);
        this.state=
        {
            username: '',
            password: ''
        };
    }
    Submit= () =>
    {
        //User authentication happens here
        if(true)
        //if(this.state.username == "admin" && this.state.password == "")
        {   
            this.props.navigator.replaceWithAnimation({
                index: 2
            });
        }
        else
        {
            Alert.alert(
                'Incorrect Username/Password',
                'Please try again',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ]
            )
            this.setState({username: '', password: '',});
        }
    }
    render(){
        return (
          <View style = {styles.container}>
            <TextInput style={styles.input}
            placeholder="username"
            returnKeyType="next"
            placeholderTextColor="rgba(255,255,255,0.6)"
            onSubmitEditing={ ()=> this.passwordInput.focus()}
            onChangeText={(username) => this.setState({username})}
            autoCapitalize="none"
            autoCorrect={false}/>  
            <TextInput style={styles.input}
            placeholder="password"
            secureTextEntry
            returnKeyType="done"
            placeholderTextColor="rgba(255,255,255,0.6)"
            ref={(input)=>this.passwordInput = input}
            onChangeText={(password) => this.setState({password})}/>  
            
            <TouchableOpacity style={styles.buttonContainer}
            onPress={this.Submit.bind(this)}>
            <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        );
    }
} 
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#34495e',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
    }

});

