import React from 'react';
import { Text, View, ToastAndroid, TouchableOpacity, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import *as Permissions from "expo-permissions"

export default class TransactionScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal"
    }
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
      scanned: false
    })
    console.log(this.state.scannedData);
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal"
    })

  }



  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const scannedData = this.state.scannedData;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>{hasCameraPermission === true ? scannedData : "Request Camera Permission"}</Text>
          <TouchableOpacity 
          onPress={()=>{
            this.getCameraPermission()
          }}
          style={styles.scanbutton}>
            <Text style={styles.scanbuttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },

  scanbutton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10
  },

  scanbuttonText: {
    fontSize: 25
  }
})