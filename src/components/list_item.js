import {Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, icons, fontsizes} from '../common';

function ListItem(props) {
  const {title, icon} = props;
  const {onPress} = props;
  console.log(props);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
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
          {title}
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
      <View
        style={{
          flex: 1,
          backgroundColor: colors.dark_primary,
          height: 1,
          marginHorizontal: 15,
        }}
      />
    </TouchableOpacity>
  );
}
export default ListItem;
