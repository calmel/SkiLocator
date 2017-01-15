'use strict';


import React, { Component } from 'react';
import 
{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ActivityIndicator
} from 'react-native';

import MapView, {MAP_TYPES} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {

  constructor(props) {
    super(props);
    console.log('logging map constructor, position is')
    console.log(this.props.Position)
    this.state = 
    {
      region: new MapView.AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      coordinate: 
      {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      isLoading: true,
    };
  }

  watchID: ?number = null;

   componentDidMount() {
     console.log("componentDidMount");
    navigator.geolocation.getCurrentPosition(
      (position) => 
      {
        console.log('initial location')
        console.log(position.coords)
        var initialPosition = JSON.stringify(position);
        this.setState({region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
        if(this.state.coordinate.latitude != LATITUDE && this.state.coordinate.longitude != LONGITUDE)
        {
          //still blank
          this.setState({isLoading: false});
        }
      },
      (error) => alert(JSON.stringify(error))
    );
    this.watchID = navigator.geolocation.watchPosition((position) => 
    {
      console.log('we got new position')
      console.log(position)
      var lastPosition = JSON.stringify(position);
      const newRegion = 
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      const newCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      this.onRegionChange(newRegion);
      this.onCoordsChange(newCoords);
      if(this.state.coordinate.latitude != LATITUDE && this.state.coordinate.longitude != LONGITUDE)
      {
        //still blank
        this.setState({isLoading: false});
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    if (this.state.coordinate !== nextState.coordinate) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    console.log('logging component unmount');
    navigator.geolocation.clearWatch(this.watchID);
  }
  onRegionChange(region) {
    console.log('region is' + JSON.stringify(region));
  this.setState({ region });
  //console.log(this.refs.map.animateToRegion)
  //this.refs.map.animateToRegion(this.state.region);

}
  onCoordsChange(coordinate) {
    console.log('coordinates is' + JSON.stringify(coordinate))
  this.setState({ coordinate });
  //this.refs.map.animateToCoordinate(this.state.coordinate);
}
  render() 
  {
      console.log('rednering HelloWorld')
    if(this.state.isLoading)
    {
      return(
      <View style={styles.Loading}>
        <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
        <Text>Loading...</Text>
      </View>)
    }
    else
    {
  
      return (
        <View style={styles.container}>
          <Text>
            <Text style={styles.title}>Current position: </Text>
            {JSON.stringify(this.state.coordinate)}
          </Text>
          <MapView.Animated
          ref={"map"}
          style={styles.map}
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
        >
        <MapView.Marker.Animated
              coordinate={this.state.coordinate}
            />
        </MapView.Animated>
        </View>
      );
    }
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
  },
  Loading: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
  },
    map:{
     flex: 1,
  },
bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
});
