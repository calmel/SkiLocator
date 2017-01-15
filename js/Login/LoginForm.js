
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Navigator, AsyncStorage} from 'react-native';

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

//declaring server address
const APIRoot = "https://skilocator.herokuapp.com/";

//declaring specific endpoints
const APIEndpoints= {
    LOGIN:          APIRoot + "/v1/login",
    SIGNUP:         APIRoot + "/v1/users",
};

export default class LoginForm extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            username: '',
            password: '',
            isLoggedIn : false,
        };
    }
    storetoken = async (access_token) =>
    {
        try 
        {
            await AsyncStorage.setItem('access_token', access_token);
        } 
        catch (error) 
        {
            // Error saving data
            console.log(error);
        }
    }
    SubmitLogin= () =>
    {
        //User authentication happens here
        let access_token = this.Authenticate();
        console.log('Json returned is');
        console.log(access_token);
        if(access_token)
        //if(this.state.username == "admin" && this.state.password == "")
        {   
            this.setState({isLoggedIn: true});
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
   SubmitSignUp = () => {
        //create User
        console.log('signup')
        return fetch(APIEndpoints.SIGNUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: { 
                    username: this.state.username,
                    email: this.state.username,
                    password: this.state.password,
                    password_confirmation: this.state.password,
                },
            })
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            //onSuccess
            console.log('onsuccess')
            console.log('json is ')
            console.log(responseJson)
            if(!responseJson.error)
                return Alert.alert(
                    'User Created Successfully!',
                    'Username: '+ this.state.username,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')}
                    ]
                );
            else
                alert(responseJson.error);

        })
        .catch((error) => 
        {
            //onFailure
            console.error(error);
            alert(error);
        });

    }
    Authenticate = () => 
    {
        //authenticate
        return fetch(APIEndpoints.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    email: this.state.username,
                    password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            //onSuccess
            return responseJson.access_token;
        })
        .catch((error) => 
        {
            //onFailure
            console.error(error);
            alert(error);
        });

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
            <View style={styles.buttonBar}>
                <TouchableOpacity style={styles.buttonLogin}
                onPress={this.SubmitLogin.bind(this)}>
                <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.buttonSignup}
                onPress={this.SubmitSignUp.bind(this)}>
                <Text style={styles.signupText}>SIGN UP</Text>
                </TouchableOpacity>
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
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonLogin: {
        flex: 1,
        backgroundColor: '#34495e',
        paddingVertical: 15,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    buttonSignup: {
        flex: 1,
        backgroundColor: '#34495e',
        paddingVertical: 15,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    loginText: {
        flex: 1,
        color: '#fff',
        fontWeight: '700',
        paddingHorizontal: 30,
        justifyContent: 'flex-start'
    },
    signupText: {
        flex: 1,
        color: '#fff',
        fontWeight: '700',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
    },
    buttonBar: {
        flex: 1,
        flexDirection: 'row',
    }
});

