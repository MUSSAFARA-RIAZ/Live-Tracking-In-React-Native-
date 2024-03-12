import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import GOOGLE_API_KEY from "../../constants";
import { useNavigation } from "@react-navigation/native";

// console.logS(GOOGLE_API_KEY);
// const Api="AIzaSyDK7vRWhnxX8DgluGK9oT5K47AfSEz-J84"
export default function MapComponent() {
    const navigation=useNavigation();

  const [state, setstate] = useState({
    pickupcords: {
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropcords: {
      latitude: 31.5204,
      longitude: 74.3587,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const mapRef = useRef(null);

  const { pickupcords, dropcords } = state;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          ref={mapRef}
          initialRegion={state.pickupcords}
        >
          <Marker coordinate={state.pickupcords} />
          <Marker coordinate={state.dropcords} />

          <MapViewDirections
            origin={state.pickupcords}
            destination={state.dropcords}
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
        <Text>Where are you going ?</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("GoogleMapSearchLocation")}>
            <Text style={{color:"white"}}>Choose Your Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom:{
    backgroundColor:"white",
    padding:30,
    borderTopEndRadius:30,
    borderTopStartRadius:30,
    width:"100%"

  },
  btn:{
    backgroundColor:"red",
    borderColor:"white",
    borderRadius:10,
    padding:10,
  }
});
