/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import {
    Login,
    Welcome,
    Register,
    CourseList,
    Vocabularies,
    Settings
} from './src/screens'

AppRegistry.registerComponent(appName, () => Settings);
