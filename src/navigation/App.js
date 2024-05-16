import React, {Component, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    Welcome,
    Login,
    Register,
    Profile,
    LessonContent,
    Home, CourseList,
    ChangePassword,
    FullTest, MiniTest, DoTest,
    Vocabularies,
    ForgotPassword,
    Tips, Part1, Part2,
    Quiz,
    AlarmClock,
    Coming
} from '../screens'
import UITab from './UITab'
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator()
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Home"} component={Home}/>
            <Stack.Screen name={"Coming"} component={Coming}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"Profile"} component={Profile}/>
            <Stack.Screen name={"ChangePassword"} component={ChangePassword}/>
            <Stack.Screen name={"LessonContent"} component={LessonContent}/>
            <Stack.Screen name={"UITab"} component={UITab}/>
            <Stack.Screen name={"Vocabularies"} component={Vocabularies}/>      
            <Stack.Screen name={"ForgotPassword"} component={ForgotPassword}/>   
            <Stack.Screen name={"Tips"} component={Tips}/>   
            <Stack.Screen name={"Part1"} component={Part1}/>    
            <Stack.Screen name={"Part2"} component={Part2}/> 
            <Stack.Screen name={"Quiz"} component={Quiz}/>    
            <Stack.Screen name={"FullTest"} component={FullTest}/>  
            <Stack.Screen name={"MiniTest"} component={MiniTest}/> 
            <Stack.Screen name={"DoTest"} component={DoTest}/>    
            <Stack.Screen name={"AlarmClock"} component={AlarmClock}/> 
            <Stack.Screen name={"CourseList"} component={CourseList}/>    
        </Stack.Navigator>
    </NavigationContainer>
}
export default App