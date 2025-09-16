import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoImage from "../../assets/images/OnboardingPage/Logo.png";
import BackgroundImage from "../../assets/images/OnboardingPage/BackgroundImage.png"; 

const { width, height } = Dimensions.get("window");

const SplashComponent = () => {
  const navigation = useNavigation();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem("firstLaunch");
      if (firstLaunch === null) {
        await AsyncStorage.setItem("firstLaunch", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();

    Animated.timing(scale, {
      toValue: 1.4,
      duration: 2000,
      easing: Animated.Easing?.out?.(Animated.Easing.exp),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate("OnboardingOne");
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, scale]);

  return (
    <View style={styles.container}>
      <Image
        source={BackgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.Image
        source={LogoImage}
        style={[styles.logo, { transform: [{ scale }] }]}
      />
      <Text style={styles.version}>v1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFD",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 160,
    height: 80,
    resizeMode: "contain",
  },
  version: {
    position: "absolute",
    bottom: 30,
    color: "#757575",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SplashComponent;