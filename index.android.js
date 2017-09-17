/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import 
{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Map from './js/Map/Map';
import Login from './js/Login/Login'
import BeEncouraged from './js/ScrollView/ScrollView'
import EncourageSomeone from './js/ScrollView/EncourageSomeone'
import ReceivedText from './js/ScrollView/receivedText'

export default class Calvin extends Component 
{
  render() 
  {
    return (
      <Navigator
      initialRoute= 
      {{
        title: 'Login',
        index: 0
      }}
      renderScene=
      {
        (route, navigator) => 
        {
          switch(route.index)
          {
            //all routing paths goes here..
            case 0:
              return <Login title="Login" navigator={navigator}/>
            case 1:
              return <Map title="Map" navigator={navigator}/>
            case 2:
              return <BeEncouraged title="SampleMenu" navigator={navigator}/>
            case 3:
              return <EncourageSomeone title="SampleMenu" navigator={navigator}/>
            case 4:
            return <ReceivedText title="Receiving" navigator={navigator}/>
          }
        }
      }
      />
    );
  }
}
AppRegistry.registerComponent('Calvin', () => Calvin);
