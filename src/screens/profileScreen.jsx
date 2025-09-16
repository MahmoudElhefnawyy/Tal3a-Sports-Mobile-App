import { View, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderLayout from '../layouts/headerLayout';
import MainBody from '../components/profilePageComponents/mainBodyComponent';
import FooterLayout from '../layouts/footerLayout';
import BackgroundImage from '../assets/images/OnboardingPage/BackgroundImage.png';
import { ProfileContextProvider } from '../contexts/profileContext';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleNext = () => {
    console.log('Next action triggered');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <ProfileContextProvider>
      <View style={styles.contentContainer}>
        <HeaderLayout onBack={handleBack} />
        <MainBody onNext={handleNext} onBack={handleBack} />
      </View>
      <FooterLayout />
      </ProfileContextProvider>
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
  },
  contentContainer: {
    flex: 1,
  },
});

export default ProfileScreen;