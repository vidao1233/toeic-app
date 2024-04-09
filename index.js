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
} from './src/components'

AppRegistry.registerComponent(appName, () => Vocabularies);
