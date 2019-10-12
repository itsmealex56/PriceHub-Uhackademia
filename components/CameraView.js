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

import firebase from "@react-native-firebase/app"
import database from "@react-native-firebase/database"
import { RNCamera, FaceDetector } from "react-native-camera"
import Dialog, { DialogContent } from "react-native-popup-dialog"
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

export default class CameraView extends Component {
  static navigationOptions = {
    title: "Scan Barcode",
    headerStyle: {
      backgroundColor: "#AA3939"
    }
  }
  constructor() {
    super()
    //this.takePicture = this.takePicture.bind(this)
    // Create a reference
    this.state = {
      dialogVisible: false,
      productName: "",
      srp: "",
      weight: "",
      cameraStatus: true
    }
    this.ref = database().ref()
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.25, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri)
    }
  }

  showScanned = barcode => {
    this.ref
      .child("productlist")
      .child("barcodelist")
      .child(barcode)
      .on("value", value => {
        if (value._snapshot.value.name && value._snapshot.value.srp) {
          this.setState({
            dialogVisible: true,
            productName: value._snapshot.value.name,
            srp: value._snapshot.value.srp,
            weight: value._snapshot.value.weight,
            cameraStatus: false
          })

          console.log(value._snapshot.value.name, value._snapshot.value.srp)
        }
      })
  }

  navigateToReportView = () => {
    let { navigate } = this.props.navigation
    this.setState({
      dialogVisible: false
    })
    let dataToPass = {
      productName: this.state.productName,
      srp: this.state.srp,
      weight: this.state.weight
    }
    navigate("ReportView", dataToPass)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.cameraStatus && (
          <RNCamera
            ref={ref => {
              this.camera = ref
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            androidRecordAudioPermissionOptions={{
              title: "Permission to use audio recording",
              message: "We need your permission to use your audio",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              if (barcodes.length != 0) {
                this.showScanned(barcodes[0].data)
              }
            }}
          />
        )}
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        ></View>
        <Dialog
          visible={this.state.dialogVisible}
          onTouchOutside={() => {
            this.setState({ dialogVisible: false, cameraStatus: true })
          }}
        >
          <DialogContent>
            <Text style={styles.dialogHeader}>PRODUCT INFO</Text>
            <Text style={styles.dialog}>
              Name:
              <Text style={styles.dataStyle}>{this.state.productName}</Text>
            </Text>
            <Text style={styles.dialog}>
              Weight: <Text style={styles.dataStyle}>{this.state.weight}</Text>
            </Text>
            <Text style={styles.dialog}>
              Sugested Retail Price
              <Text style={styles.dialogMoney}>₱{this.state.srp}</Text>
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.setState({ dialogVisible: false, cameraStatus: true })
              }
            >
              <View
                style={{
                  backgroundColor: "blue",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 10
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Scan Another?
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToReportView()}>
              <View
                style={{
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  padding: 15
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Report?</Text>
              </View>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },

  dialog: {
    color: "#676767",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5
  },
  buttonReport: {
    backgroundColor: "red",
    marginTop: 5
  },
  dataStyle: {
    color: "#676767"
  },
  dialogHeader: {
    marginTop: 7,
    color: "black",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5
  },
  dialogMoney: {
    color: "#FFC107",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5
  }
})
