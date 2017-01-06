import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {MAP_TYPES} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Map extends Component 
{
    constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }


onRegionChange(region) {
  console.log(region);
  this.setState({ region });
}

render() {
  return (
    <View style={styles.container}>
      <MapView
        mapType={MAP_TYPES.TERRAIN}
        style={styles.map}
        initialRegion={this.state.region}
        onRegionChange={region => this.onRegionChange(region)}
      />
      <Text style={{ textAlign: 'center' }}>
            {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
          </Text>
    </View>
  );
}
} 

const styles = StyleSheet.create({
    container:{
      top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map:{
        position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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