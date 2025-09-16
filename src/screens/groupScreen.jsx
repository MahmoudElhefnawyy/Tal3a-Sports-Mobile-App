import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import HeaderLayout from '../layouts/headerLayout';
import MainBodyComponent from '../components/groupPageComponents/mainBodyComponent';
import BackgroundImage from '../assets/images/OnboardingPage/BackgroundImage.png';
import FooterLayout from '../layouts/footerLayout';
import { GroupContextProvider } from '../contexts/groupContext';

const { width, height } = Dimensions.get('window');

const GroupScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <GroupContextProvider>
      <View style={styles.mainContainer}>
        {/* Header - Fixed at top */}
        <View style={styles.headerContainer}>
          <HeaderLayout onBack={onBack} />
        </View>
        
        {/* Main Content - Scrollable area */}
        <View style={styles.contentContainer}>
          <MainBodyComponent />
        </View>
        
        {/* Footer - Fixed at bottom */}
        <View style={styles.footerContainer}>
          <FooterLayout />
        </View>
      </View>
      </GroupContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(248, 249, 251, 0.9)',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flexShrink: 0,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  footerContainer: {
    flexShrink: 0,
    zIndex: 1,
  },
});

export default GroupScreen;