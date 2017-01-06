import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';

import LoginForm from './LoginForm';

export default class Login extends Component 
{
    render()
    {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                <Image style={styles.logo} 
                source={require('./img/snowboard.png')}/>
                <Text style={styles.title}>Experimental App</Text>
                </View>
                <View style={styles.formContainer}>
                <LoginForm navigator={this.props.navigator}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#34495e',
    },
    logoContainer:{
        alignItems: 'center',
        flexGrow:1,
        justifyContent: 'center'
    },
    formContainer:{

    },
    logo: {
        width:100,
        height: 100,
        backgroundColor: 'transparent'
    },
    title:{
        color: '#FFF',
        marginTop:10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    }
});
