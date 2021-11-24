import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import PotholeEvent from "../components/PotholeEvent";
// import Toast from 'react-native-simple-toast';

// Toast.show('This is a long toast.', Toast.LONG);

const Detect = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };
  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };
  const _subscribe = () => {
    let prevX, prevY, prevZ;
    let lastUpdate = 0;
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };
  const _unsubscribre = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribre();
  }, []);

  const { x, y, z } = data;
  const handleBtnOnOff = () => {
    // Toast.show('This is a toast.');
  };

  return (
    <View style={styles.flexContainer}>
      {/* <Text>
        x :{x.toFixed(4)} y:{y.toFixed(4)} z:{z.toFixed(4)}
      </Text> */}
      <PotholeEvent />
      <TouchableOpacity
        style={styles.btnOnOFF}
        // onPress={subscription ? _unsubscribre : _subscribe}
        onPress={handleBtnOnOff}
      >
        <Text style={{ fontSize: 40 }}>{subscription ? "OFF" : "ON"}</Text>
      </TouchableOpacity>
      {/* <Button onPress={_fast} title="fast" /> */}
    </View>
  );
};

export default Detect;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    // flexDirection: "row",
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: "green",
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: "blue",
  },
  btnOnOFF: {
    alignItems: "center",
    backgroundColor: "#57b07a",
    padding: 10,
  },
});
//
