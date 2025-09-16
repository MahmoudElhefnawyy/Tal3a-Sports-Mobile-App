import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashComponent from '../components/onboardingPageComponents/splashComponent';
import OnboardingOneComponent from '../components/onboardingPageComponents/onboardingOneComponent';
import OnboardingTwoComponent from '../components/onboardingPageComponents/onboardingTwoComponent';
import OnboardingThreeComponent from '../components/onboardingPageComponents/onboardingThreeComponent';
import OnboardingFourComponent from '../components/onboardingPageComponents/onboardingFourComponent';
import OnboardingFiveComponent from '../components/onboardingPageComponents/onboardingFiveComponent';

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(1); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 1) { 
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    navigation.navigate('Register');
  };

  const renderScreen = () => {
    switch (currentIndex) {
      case 0:
        return <SplashComponent />;
      case 1:
        return <OnboardingOneComponent onNext={handleNext} onBack={null} />;
      case 2:
        return <OnboardingTwoComponent onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <OnboardingThreeComponent onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <OnboardingFourComponent onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <OnboardingFiveComponent onNext={handleFinish} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default OnboardingScreen;