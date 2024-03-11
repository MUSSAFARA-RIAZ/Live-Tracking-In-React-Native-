import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Home = () => {
    const navigation=useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("MapComponent")}>
        
        
        <Text>Location Screen</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Home