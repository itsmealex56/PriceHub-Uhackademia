import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Button,
  Image
} from "react-native"
import firebase from "@react-native-firebase/app"
import database from "@react-native-firebase/database"
import ImagePicker from "react-native-image-picker"
//import storage from "@react-native-firebase/storage"
// import Geolocation from "react-native-geolocation-service"

class ReportView extends Component {
  static navigationOptions = {
    title: "Report",
    headerStyle: {
      backgroundColor: "#AA3939"
    }
  }

  constructor(props) {
    super(props)

    this.ref = database().ref()

    let { navigation } = this.props
    this.productName = navigation.getParam("productName").toString()
    srp = navigation.getParam("srp").toString()
    weight = navigation.getParam("weight").toString()
    this.state = {
      productName: this.productName,
      srp: srp,
      weight: weight,
      establishments: {},
      establishment: "Yubengco - Putik",
      reason: "OVERPRICING"
    }
  }

  sentReport = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, "0")
    let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
    let yyyy = today.getFullYear()
    let hour = today.getHours()
    let min = today.getMinutes()

    today = mm + "/" + dd + "/" + yyyy + " " + hour + ":" + min
    data = {
      date: today,
      establishment: this.state.establishment,
      message: "THIS I MESAFE",
      proof: "link",
      type: this.state.reason,
      user: "RALP",
      productName: this.productName
    }

    this.ref
      .child("reports")
      .push()
      .set(data)
  }

  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true
  //   }
  //   ImagePicker.launchImageLibrary(options, response => {
  //     if (response.uri) {
  //       this.setState({ photo: response })
  //     }
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogHeader}>PRODUCT INFO</Text>
        <Text style={styles.dialog}>
          Name: <Text style={styles.dataStyle}>{this.state.productName}</Text>
        </Text>
        <Text style={styles.dialog}>
          Weight: <Text style={styles.dataStyle}>{this.state.weight}</Text>
        </Text>
        <Text style={styles.dialog}>
          Sugested Retail Price{" "}
          <Text style={styles.dialogMoney}> ₱{this.state.srp}</Text>
        </Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}
        />
        <Text style={styles.reasonOfReport}>REASON OF REPORT</Text>
        <Picker
          selectedValue={this.state.reason}
          style={{ height: 50, width: "100%", marginTop: 5 }}
          onValueChange={(reasonData, itemIndex) =>
            this.setState({ reason: reasonData })
          }
        >
          <Picker.Item
            color="#676767"
            label="OVERPRICING"
            value="OVERPRICING"
          />
          <Picker.Item
            color="#676767"
            label="EXPIRED PRODUCT"
            value="EXPIRED PRODUCT"
          />
        </Picker>

        <Text style={styles.reasonOfReport}>SELECT ESTABLISHMENT</Text>
        <Picker
          selectedValue={this.state.establishment}
          style={{ height: 50, width: "100%", marginTop: 5 }}
          onValueChange={(establishment, itemIndex) =>
            this.setState({ establishment: establishment })
          }
        >
          <Picker.Item
            color="#676767"
            label="Yubengco - Putik"
            value="Yubengco - Putik"
          />
          <Picker.Item
            color="#676767"
            label="Yubengco - Tetuan"
            value="Yubengco - Tetuan"
          />
          <Picker.Item
            color="#676767"
            label="Yubengco - San Jose"
            value="Yubengco - San Jose"
          />
          <Picker.Item
            color="#676767"
            label="KCC Supermarket"
            value="KCC Supermarket"
          />
          <Picker.Item
            color="#676767"
            label="Budgetwise - Ayala"
            value="Budgetwise - Ayala"
          />
          <Picker.Item
            color="#676767"
            label="Budgetwise"
            value="expiredProduct"
          />
          <Picker.Item
            color="#676767"
            label="LB Supermarket"
            value="LB Supermarket"
          />
          <Picker.Item color="#676767" label="SM Mindpro" value="SM Mindpro" />
          <Picker.Item color="#676767" label="City Mall" value="City Mall" />
          <Picker.Item
            color="#676767"
            label="Southway Square"
            value="Southway Square"
          />
          <Picker.Item color="#676767" label="Gateway" value="Gateway" />
          <Picker.Item color="#676767" label="OK Bazaar" value="OK Bazaar" />
          <Picker.Item
            color="#676767"
            label="Shop-o-rama"
            value="Shop-o-rama"
          />
          <Picker.Item
            color="#676767"
            label="Shoppers Plaza"
            value="Shoppers Plaza"
          />
          <Picker.Item color="#676767" label="City Mart" value="City Mart" />
        </Picker>

        <TouchableOpacity onPress={() => this.sentReport()}>
          <View
            style={{
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              padding: 15
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>SEND REPORT</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  dialog: {
    color: "#676767",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5,
    marginLeft: 10
  },
  reasonOfReport: {
    color: "#676767",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10
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
    marginBottom: 5,
    marginLeft: 10
  },
  dialogMoney: {
    color: "#FFC107",
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 30,
    marginBottom: 5
  }
})

export default ReportView
