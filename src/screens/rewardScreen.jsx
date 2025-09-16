import { View, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import HeaderLayout from '../layouts/headerLayout';
import MainRewardsComponent from '../components/rewardPageComponents/mainBodyComponent';
import BackgroundImage from '../assets/images/OnboardingPage/BackgroundImage.png';
import FooterLayout from '../layouts/footerLayout';
import { RewardContextProvider } from '../contexts/rewardContext';

const { width, height } = Dimensions.get('window');

const RewardsScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <RewardContextProvider>
      <View style={styles.contentContainer}>
        <HeaderLayout onBack={onBack} />
        <MainRewardsComponent />
      </View>
      </RewardContextProvider>
      <FooterLayout />
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

export default RewardsScreen;