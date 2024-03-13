import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_API_KEY from "../../constants";
import AddressPickup from "../Components/AddressPickup";
import { useNavigation } from "@react-navigation/native";

const GoogleMapSearchLocation = (props) => {
  const navigation = useNavigation();
  console.log("propsssss", props);

  const [state, setstate] = useState({
    pickupLocation: "",
    destinationLocation: "",
  });
  const { pickupLocation, destinationLocation } = state;

  const data = [
    {
      id: "1",
      placeHolderText: "Enter Pickup Location",
      fetchAddress: (lat, long) => {
        console.log("Latitude", lat);
        console.log("Longitude", long);
        setstate({
          ...state,
          pickupLocation: {
            latitude: lat,
            longitude: long,
          },
        });
      },
    },

    {
      id: "2",
      placeHolderText: "Enter Destination Location",
      fetchAddress: (lat, long) => {
        console.log("Latitude", lat);
        console.log("Longitude", long);
        setstate({
          ...state,
          destinationLocation: {
            latitude: lat,
            longitude: long,
          },
        });
      },
    },
  ];
  //console.log("pppppppppppp",props.route.params.getCordinates.pickupLocation);

  // console.log('Pickuplocation',pickupLocation);
  // console.log('DestinationLocation',destinationLocation);

  const renderItem = ({ item }) => (
    <View style={styles.addressPickupContainer}>
      <AddressPickup
        placeHolderText={item.placeHolderText}
        fetchAddress={item.fetchAddress}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        onPress={() => {
          props.route.params.getCordinates({
            pickupLocation,
            destinationLocation,
          });
          

          navigation.goBack();
        }}
      >
        <Text style={styles.button}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addressPickupContainer: {
    marginBottom: 10,
  },
  button: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20, // Adjusted marginTop to create space between the AddressPickup and button
  },
});

export default GoogleMapSearchLocation;
