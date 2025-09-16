import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingTwoImage from '../../assets/images/OnboardingPage/OnboardingTwo.png';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';
import SliderImage from '../../assets/images/OnboardingPage/SliderTwo.png';

const { width, height } = Dimensions.get('window');

const OnboardingTwoComponent = ({ onNext, onBack }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={BackgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={OnboardingTwoImage}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>المشكلة اللي بنحلها</Text>
          <Text style={styles.subtitle}>
            كثير من الشباب في مصر عايزين يتمرنوا ويلعبوا{'\n'}
            رياضة، بس مش لاقين الشريك المناسب أو{'\n'}
            المجموعة اللي تشاركهم لنفس الاهتمام
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <Image
            source={SliderImage}
            style={styles.sliderImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, styles.backButton]}
            onPress={onBack}
          >
            <Text style={[styles.navText, styles.backNavText]}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]}
            onPress={onNext}
          >
            <Text style={[styles.navText, styles.nextNavText]}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipText: {
    color: '#9E9E9E',
    fontSize: 20,
    fontWeight: '400',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: height * 0.5,
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.4,
    maxWidth: 350,
    maxHeight: 350,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00BFA5',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
    maxWidth: width * 0.85,
  },
  sliderContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  sliderImage: {
    width: 60,
    height: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    marginTop: 20,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    backgroundColor: '#F5F5F5',
  },
  nextButton: {
    backgroundColor: '#00BFA5',
  },
  navText: {
    fontSize: 20,
    fontWeight: '600',
  },
  backNavText: {
    color: '#9E9E9E',
  },
  nextNavText: {
    color: '#FFFFFF',
  },
});

export default OnboardingTwoComponent;