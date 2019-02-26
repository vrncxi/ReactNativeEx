import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
    speed: 0,
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000); 
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
      let { x, y, z } = this.state.accelerometerData;
      let speed = x*x + y*y + z*z;
      this.setState({speed});
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    let run = this.state.speed > 1.3 ? <Text style={styles.run}>You are running</Text> : <Text style={styles.walk}>You are walking</Text>;
    

    return (
      <View style={styles.sensor}>
       

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <Text>Accelerometer:</Text>
        <Text>x: {round(x)} </Text>
        <Text>y: {round(y)} </Text>
        <Text>z: {round(z)}</Text>
        {run}
        
        
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
  },

  run: {
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'powderblue'
  },
  walk: {
    flex: 1,
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'steelblue'

  }
});