import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert
} from "react-native"
import { icons, images, colors } from "../common/index"
import { UIButton } from "../navigators"

function Welcome(props) {
    //state => when a state is changed => UI is reload
    const [actions, setAction] = useState([
        {
            name: 'REGISTER',
            isSelected: true,
        },
        {
            name: 'LOGIN',
            isSelected: false,
        },
    ])
    return <View style={{
        backgroundColor: 'white',
        flex: 100
    }}>
        <ImageBackground
            source={
                images.background
            }
            resizeMode="cover"
            style={{
                flex: 100
            }}>
            <View style={{
                flex: 10,
                backgroundColor: colors.dark_primary,
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 7

                }}>
                    <Image
                        source={icons.logo}
                        style={{
                            marginHorizontal: 10,
                            width: 48,
                            height: 48,
                            tintColor: 'white'
                        }}
                    />
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontStyle: 'italic'
                    }}>ONLINE EDUCATION & LEARNING</Text>
                    <View style={{ flex: 1 }} />
                    <Image
                        source={icons.ask_icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: 'white',
                            marginEnd: 10
                        }}
                    />
                </View>
            </View>
            <View style={{
                flex: 40,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    marginBottom: 7,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 25
                }}>Welcome to VictoryU</Text>
                <Text style={{
                    marginBottom: 7,
                    color: 'white',
                }}>Nền Tảng Luyện Thi TOEIC</Text>
                <Text style={{
                    marginBottom: 7,
                    color: 'white',
                    fontSize: 8
                }}>Dự án này chỉ mang mục đích học tập nghiên cứu, không mang bất kỳ giá trị thương mại nào.</Text>
            </View>
            <View style={{
                flex: 40,
            }} />
            <View style={{
                flex: 20,
            }}>
                {actions.map(action =>
                    <UIButton
                        key={action.name}
                        onPress={() => {
                            setAction(actions.map(eachAction => {
                                return {
                                    ...eachAction,
                                    isSelected: eachAction.name == action.name
                                }
                            }))
                        }}
                        title={action.name}
                        isSelected={action.isSelected}
                    />)

                }
            </View>
            <View style={{
                flex: 20,
                backgroundColor: colors.dark_primary,
                alignItems: 'center',
                marginHorizontal: 'center'
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: 'white'
                    }}
                >VictoryU - English Center</Text>
                <Text
                    style={{
                        color: 'white'
                    }}
                >Contact with us:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={icons.email}
                        style={{                            
                            tintColor: 'white',
                            width: 18,
                            height: 18,
                        }} />
                    <Text
                        style={{
                            marginHorizontal: 5,
                            color: 'white'
                        }}
                    >Email: vidao1233@gmail.com</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={icons.facebook}
                        style={{                            
                            tintColor: 'white',
                            width: 15,
                            height: 15,
                        }} />
                    <Text
                        style={{
                            marginHorizontal: 5,
                            color: 'white'
                        }}
                    >Fanpage: facebook.com/victoryu.toeic</Text>
                </View>

            </View>
        </ImageBackground>

    </View>
}
export default Welcome