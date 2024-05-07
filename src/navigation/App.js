import React, {Component, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    Welcome,
    Login,
    Register,
    Profile,
    LessonContent,
    Home,
    ChangePassword,
    TestList,
    Vocabularies
} from '../screens'
import UITab from './UITab'

const Stack = createNativeStackNavigator()

function App(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Vocabularies' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Home"} component={Home}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"Profile"} component={Profile}/>
            <Stack.Screen name={"ChangePassword"} component={ChangePassword}/>
            <Stack.Screen name={"LessonContent"} component={LessonContent}/>
            <Stack.Screen name={"TestList"} component={TestList}/>
            <Stack.Screen name={"UITab"} component={UITab}/>
            <Stack.Screen name={"Vocabularies"} component={Vocabularies}/>                
        </Stack.Navigator>
    </NavigationContainer>
}
export default App