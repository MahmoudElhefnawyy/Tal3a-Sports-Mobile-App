import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import LoginComponent from '../components/loginPageComponents/loginComponent';
import PersonalInfoComponent from '../components/loginPageComponents/personalInfoComponent';
import LocationComponent from '../components/loginPageComponents/locationComponent';
import FavoriteSportComponent from '../components/loginPageComponents/favoriteSportComponent';

const LoginScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const startFromRegister = route.params?.startFromRegister;

  useEffect(() => {
    if (startFromRegister) {
      setCurrentIndex(1);
    }
  }, [startFromRegister]);

  const handleNext = () => {
    console.log('Next clicked, currentIndex:', currentIndex); 
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    console.log('Back clicked, currentIndex:', currentIndex);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleFinish = () => {
    console.log('Finish clicked'); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    }); 
  };

  const handleLogin = () => {
    console.log('Login clicked'); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    }); 
  };

  const handleRegister = () => {
    console.log('Register clicked'); 
    setCurrentIndex(1); 
  };

  const renderScreen = () => {
    switch (currentIndex) {
      case 0:
        return (
          <LoginComponent
            onLogin={handleLogin}
            onRegister={handleRegister} 
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <PersonalInfoComponent
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <LocationComponent
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <FavoriteSportComponent
            onNext={handleFinish}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
  },
  innerContainer: {
    flex: 1,
  },
});

export default LoginScreen;