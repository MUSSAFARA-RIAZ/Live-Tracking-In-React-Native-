import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import GOOGLE_API_KEY from '../../constants'

export default  AddressPickup = ({placeHolderText, fetchAddress}) => {
  return (
    <View style={{flex:1}}>
    <GooglePlacesAutocomplete
    placeholder={placeHolderText}
    fetchDetails={true}
   
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      const lat = details.geometry.location.lat;
      const long=details.geometry.location.lng;
     // console.log( details.geometry.location.lat, details.geometry.location.lng);
      fetchAddress(lat,long);

    }}
    query={{
      key: GOOGLE_API_KEY,
      language: 'en',
    }}
    styles={{
      container: {
        flex: 0,
      },
      textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        margin:5,
        borderBottomWidth: 0,
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
    }}
 //   enablePoweredByContainer={false}
    
  /> 
  </View>
  )
}
const styles=StyleSheet.create({


})


