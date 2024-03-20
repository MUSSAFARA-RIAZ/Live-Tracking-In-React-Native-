import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import GOOGLE_API_KEY from "../../constants";
import GoogleMapSearchDestination from "../Screens/GoogleMapSearchDestination.js"

const KARACHI_COORDINATES = {
  latitude: 24.8607,
  longitude: 67.0011,
};

export default function MapComponent() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    pickupcords: {
      latitude: KARACHI_COORDINATES.latitude,
      longitude: KARACHI_COORDINATES.longitude,
    },
    dropcords: {
      latitude: 31.5204,
      longitude: 74.3587,
    },
  });
  const mapRef = useRef(null);

  const { pickupcords, dropcords } = state;

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setState((prevState) => ({
      ...prevState,
      pickupcords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      dropcords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    }));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const navigateToSearchDestination = () => {
    navigation.navigate("GoogleMapSearchDestination", {
      getCordinates: (data) => {
        // Check if data is received
        if (data && data.destinationLocation) {
          setState((prevState) => ({
            ...prevState,
            dropcords: {
              // Set destination coordinates from user input
              latitude: data.destinationLocation.latitude,
              longitude: data.destinationLocation.longitude,
            },
          }));
        } else {
          // Handle if destinationLocation data is not received
          console.log("Invalid destination location data");
        }
      },
    });
    
  };
  console.log("Mussaafaraaaaaaa", state);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          ref={mapRef}
          initialRegion={{
            ...KARACHI_COORDINATES,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={pickupcords} />
          <Marker coordinate={dropcords} />
          <MapViewDirections
            origin={pickupcords}
            destination={dropcords}
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="red"
            optimizeWaypoints={true}
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 50,
                  left: 30,
                  top: 100,
                  bottom: 300,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("GoogleMapSearchLocation", {
              getCordinates: (data) => {
                setState({
                  pickupcords: {
                    latitude: data.pickupLocation.latitude,
                    longitude: data.pickupLocation.longitude,
                  },
                  dropcords: {
                    latitude: data.destinationLocation.latitude,
                    longitude: data.destinationLocation.longitude,
                  },
                });
              },
            })
          }
        >
          <Text style={{ color: "white" }}>Choose Your Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getCurrentLocation}>
          <Text
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: 10,
              marginBottom: 10,
            }}
          >
            Turn On Current Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={navigateToSearchDestination}
        >
          <Text style={{ color: "white" }}>Search Swap Station</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    backgroundColor: "white",
    padding: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    width: "100%",
  },
  btn: {
    backgroundColor: "red",
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});
