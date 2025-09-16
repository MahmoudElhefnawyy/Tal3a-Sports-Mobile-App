import { View, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderLayout from '../layouts/headerLayout';
import MainBody from '../components/discoverPageComponents/mainBodyComponent';
import FooterLayout from '../layouts/footerLayout';
import BackgroundImage from '../assets/images/OnboardingPage/BackgroundImage.png';
import { DiscoverContextProvider } from '../contexts/discoverContext';

const { width, height } = Dimensions.get('window');

const DiscoverScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    console.log('Next action triggered');
  };

  const handleBack = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" pointerEvents="none" />
      <DiscoverContextProvider>
        <View style={styles.mainContainer}>
          {/* Header - Fixed at top */}
          <View style={styles.headerContainer}>
            <HeaderLayout onBack={handleBack} />
          </View>
          
          {/* Main Content - Scrollable area */}
          <View style={styles.contentContainer}>
            <MainBody onNext={handleNext} onBack={handleBack} />
          </View>
          
          {/* Footer - Fixed at bottom */}
          <View style={styles.footerContainer}>
            <FooterLayout />
          </View>
        </View>
      </DiscoverContextProvider>
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
    // Header takes only the space it needs
    flexShrink: 0,
  },
  contentContainer: {
    // Content takes all remaining space
    flex: 1,
  },
  footerContainer: {
    // Footer takes only the space it needs and stays at bottom
    flexShrink: 0,
  },
});

export default DiscoverScreen;