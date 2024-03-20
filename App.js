// import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/Screens/Home'

import MapComponent from './src/Screens/MapComponent'
import GoogleMapSearchLocation from './src/Screens/GoogleMapSearchLocation'
import GoogleMapSearchDestination from './src/Screens/GoogleMapSearchDestination'

const stack=createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={Home}/>
        <stack.Screen name="MapComponent" component={MapComponent}/>
        <stack.Screen name='GoogleMapSearchLocation' component={GoogleMapSearchLocation}/>
        <stack.Screen name='GoogleMapSearchDestination' component={GoogleMapSearchDestination}/>
       
      </stack.Navigator>
    </NavigationContainer>
  )
}



export default App;
