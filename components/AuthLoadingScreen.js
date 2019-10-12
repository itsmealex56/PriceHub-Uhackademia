import React, { Component } from "react"

import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native"

class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem("USER_INFO");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate("CameraView")
  }

  // Render any loading content that you like here
  render() {
    return null
  }
}
export default AuthLoadingScreen
