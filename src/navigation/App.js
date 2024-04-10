import React, {Component, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    Welcome,
    Login,
    Register,
    CourseList,
    Vocabularies,
    Settings
} from '../screens'
import UITab from './UITab'

const Stack = createNativeStackNavigator()

function App(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"UITab"} component={UITab}/>                
        </Stack.Navigator>
    </NavigationContainer>
}
export default App