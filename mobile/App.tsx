import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from "./src/images/map-marker.png"

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.2092051,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >

        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.8,
            y: 0.8,
          }}
          coordinate={{
            latitude: -27.2092052,
            longitude: -49.6401092
          }}
        >
          <Callout tooltip onPress={() => { alert('oi') }} >
            <View style={styles.calloutContainer} >
              <Text style={styles.calloutText}> Mundo Encantado </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> 2 orphanages encontrados </Text>

        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => { alert('oi') }} >
          <Feather name='plus' size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 168,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",

  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
  },

  footer: {

  },

  footerText: {

  },

  createOrphanageButton: {

  }

});
