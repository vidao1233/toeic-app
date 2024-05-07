import {Text, View, Image, TouchableOpacity} from 'react-native';
import {icons, fontsizes} from '../common';

function TestItem(props) {
  const {name, time, questionNum} = props;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 140,
        paddingStart: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <Image
        style={{
          height: 50,
          width: 50,
          marginTop: 5,
          resizeMode: 'cover',
        }}
        source={icons.course_icon}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 15,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontsizes.h3,
            fontWeight: 'bold',
          }}>
          {`${name}`.toUpperCase()}
        </Text>
        <View style={{height: 1, backgroundColor: 'black'}}></View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 30,
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              width: 90,
              color: 'black',
              fontSize: fontsizes.h4,
            }}>{questionNum} câu</Text>
            <Text
            numberOfLines={1}
            style={{
              width: 90,
              color: 'black',
              fontSize: fontsizes.h4,
            }}>{time} phút</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default TestItem;
