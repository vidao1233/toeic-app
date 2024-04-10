import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import 'react-native-gesture-handler'
import { View, Image } from 'react-native'
import { fontsizes, colors, icons } from '../common'
import {
    Login,
    Welcome,
    Register,
    CourseList,
    Vocabularies,
    Settings
} from '../screens'
const Tab = createBottomTabNavigator()
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: colors.inactive,
    tabBarActiveBackgroundColor: colors.dark_primary,
    tabBarInactiveBackgroundColor: colors.dark_primary,
    tabBarBackground: () => (
        <View style={{ backgroundColor: colors.primary, flex: 1 }}></View>
    ),
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name
        const iconName = screenName == "Vocabularies" ? icons.vocabularies :
            (screenName == "CourseList" ? icons.online_course : (
                screenName == "Settings" ? icons.setting : ''
            ))
        return <Image source={iconName}
            style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'white' : colors.inactive ,
                marginTop: 10
            }} />
    },
})

function UITab(props) {
    return <Tab.Navigator
        screenOptions={screenOptions}>
        <Tab.Screen
            name={"Vocabularies"}
            component={Vocabularies}
            options={{
                tabBarLabel: 'Vocab',
                tabBarLabelStyle: {
                    fontSize: fontsizes.h4,
                    marginTop: 10
                }
            }}
        />
        <Tab.Screen
            name={"CourseList"}
            component={CourseList}
            options={{
                tabBarLabel: 'Courses',
                tabBarLabelStyle: {
                    fontSize: fontsizes.h4,
                    marginTop: 10
                }
            }}
        />
        <Tab.Screen
            name={"Settings"}
            component={Settings}
            options={{
                tabBarLabel: 'Setting',
                tabBarLabelStyle: {
                    fontSize: fontsizes.h4,
                    marginTop: 10
                }
            }}
        />
    </Tab.Navigator>
}
export default UITab