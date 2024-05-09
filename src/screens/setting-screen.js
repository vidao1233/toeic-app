import React, { useState, useEffect} from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch,
    Linking
} from "react-native"
import { colors, icons, fontsizes,  } from "../common"
import { Header, ListItem } from "../components"
import {removeJwtToken} from "../untils/jwt-storage"

function Settings(props) {
    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, go_back } = navigation
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return <View style={{
        flex: 1,
        backgroundColor: 'white',
    }}>
        <Header title='Settings System' />
        <ScrollView>            
            <TouchableOpacity
                onPress={() => {
                    navigate("Profile")
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.profile}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center'
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Profile</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity 
                onPress={()=>{
                    navigate("ChangePassword")
                }}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.padlock}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center'
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Change password</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    justifyContent: 'center'
                }}>
                    <Image
                        source={icons.web}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center'
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Language</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingEnd: 10,
                        opacity: 0.3
                    }}>English</Text>
                    <Image
                        source={icons.right_arrow}
                        style={{
                            paddingEnd: 10,
                            marginEnd: 10,
                            height: 10,
                            width: 10,
                            alignSelf: 'center',
                            opacity: 0.3
                        }} />
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity
            onPress={()=>{
                navigate("Tips")
            }}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.lamp}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center'
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Tips to learn</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.night}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center'
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Dark mode</Text>
                    <View style={{ flex: 1 }} />
                    <Switch
                        trackColor={{ false: colors.inactive, true: colors.dark_primary }}
                        thumbColor={isEnabled ? 'white' : colors.inactive}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/victoryu.toeic')}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.facebook_circle}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Facebook page</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.share}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Share</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity
            onPress={()=>{
                navigate("AlarmClock")
            }}
            >
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.bell}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Alarm reminder</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.information}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Instruction manual</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.term_policy}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Terms And Conditions</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
            <TouchableOpacity 
                onPress={()=>{
                    removeJwtToken()
                    navigate("Welcome")
                }}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                }}>
                    <Image
                        source={icons.logout}
                        style={{
                            marginStart: 10,
                            height: 30,
                            width: 30,
                            alignSelf: 'center',
                        }} />
                    <Text style={{
                        color: 'black',
                        fontSize: fontsizes.h2,
                        paddingStart: 30,
                    }}>Sign out</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                backgroundColor: colors.dark_primary,
                height: 1,
                marginHorizontal: 15
            }} />
        </ScrollView>
    </View>
}
export default Settings