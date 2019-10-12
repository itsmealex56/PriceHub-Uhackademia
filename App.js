/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native"

import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import ReportView from "./components/ReportView"
import CameraView from "./components/CameraView"
import AuthLoadingScreen from "./components/AuthLoadingScreen"
// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\nCmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\nShake or press menu button for dev menu"
})

const firebaseCredentials = Platform.select({
  ios: "https://invertase.link/firebase-ios",
  android: "https://invertase.link/firebase-android"
})

type Props = {}

class App extends Component<Props> {
  constructor() {
    super()
  }

  render() {
    // let s = "Jeep 1";
    return <CameraView />
  }
}

//const CameraView = createStackNavigator({ CameraView: CameraView })
const MainStack = createStackNavigator({
  CameraView: { screen: CameraView },
  ReportView: { screen: ReportView }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,

      Main: MainStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
)
