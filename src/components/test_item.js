import {Text, View, Image, TouchableOpacity} from 'react-native';
import {icons, fontsizes, colors} from '../common';

function TestItem(props) {
  const {name, icon, num} = props;
  const {onPress} = props;
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginTop: 10,
          }}>
          <Image
            source={icon}
            style={{
              marginStart: 10,
              height: 30,
              width: 30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: fontsizes.h2,
              paddingStart: 30,
            }}>
            {name}
          </Text>
          <View style={{flex: 1}} />
          <Image
            source={icons.right_arrow}
            style={{
              paddingEnd: 10,
              marginEnd: 10,
              height: 20,
              width: 20,
              alignSelf: 'center',
              opacity: 0.3,
            }}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: fontsizes.h5,
            marginLeft: 70,
            fontWeight: '400',
            marginBottom: 5,
          }}>
          {`${num} questions`}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.dark_primary,
            height: 1,
            marginHorizontal: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
export default TestItem;
