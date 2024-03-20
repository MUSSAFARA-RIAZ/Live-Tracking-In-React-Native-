import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AddressPickup from "../Components/AddressPickup";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from "react-native-maps";
import GOOGLE_API_KEY from "../../constants";

const GoogleMapSearchDestination = (props) => {
  const navigation = useNavigation();
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };
  console.log("cureeeeent location", currentLocation)

  // const handleDone = () => {
  //   if (destinationLocation) {
  //     navigation.goBack();
  //   }
  // };

  const handleDestinationSelect = (lat, long) => {
    setDestinationLocation({
      latitude: lat,
      longitude: long,
    });
  };
  console.log("destination location", destinationLocation)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Pickup Location" />
        )}
        {destinationLocation && (
          <Marker coordinate={destinationLocation} title="Destination Location" />
        )}
        {currentLocation && destinationLocation && (
          <Polyline
            coordinates={[currentLocation, destinationLocation]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        )}
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Enter Destination Location"
        onPress={(data, details = null) => {
          handleDestinationSelect(details.geometry.location.lat, details.geometry.location.lng);
        }}
        fetchDetails={true}
        debounce={300}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        styles={{
          container: styles.autocompleteContainer,
          listView: styles.listView,
        }}
      />
      <TouchableOpacity 
      onPress={() => {
         if (destinationLocation) {
         
          props.route.params.getCordinates({
            currentLocation,
            destinationLocation,
          });
          

          navigation.goBack();

        }
        }}>
        <Text style={styles.button}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  listView: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  button: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
});

export default GoogleMapSearchDestination;
