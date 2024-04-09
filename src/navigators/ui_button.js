import React from "react"
import {
    TouchableOpacity,
    Text,
    Image
} from "react-native"
import { icons, colors } from "../common"

function UIButton(props) {
    const { onPress, title, isSelected } = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            borderColor: 'white',
            borderWidth: 2,
            height: 45,
            borderRadius: 5,
            marginHorizontal: 20,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isSelected == true ? 'white' : null
        }}>
        {
            isSelected == true && <Image
                source={icons.check_circle}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: colors.dark_primary,
                    marginEnd: 10,
                    position: 'absolute',
                    left: 10,
                    top: 10
                }} />
        }
        <Text style={{
            color: isSelected ==  true ? colors.dark_primary : 'white',
            fontSize: 18,
        }}>{title}</Text>
    </TouchableOpacity>
}
export default UIButton