import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';

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
            this.props.navigator.replace({
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
            placeholderTextColor="rgba(255,255,255,0.2)"
            onSubmitEditing={ ()=> this.passwordInput.focus()}
            onChangeText={(username) => this.setState({username})}
            autoCapitalize="none"
            autoCorrect={false}/>  
            <TextInput style={styles.input}
            placeholder="password"
            secureTextEntry
            returnKeyType="done"
            placeholderTextColor="rgba(255,255,255,0.2)"
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

