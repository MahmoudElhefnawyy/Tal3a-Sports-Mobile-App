import { useState } from 'react';
import { Platform } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';

const { width, height } = Dimensions.get('window');

const getShadowStyle = () => ({
  ...(Platform.OS === 'web'
    ? {
        boxShadow: '0 4px 8px rgba(0, 191, 165, 0.3)',
      }
    : Platform.select({
        ios: {
          shadowColor: '#00BFA5',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
        default: {},
      })),
});

const LocationComponent = ({ onNext, onBack }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = () => {
    if (!isLoading) onNext();
  };

  const handleLocationSelect = () => {
    if (!location.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال موقعك');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  const handleCurrentLocation = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setLocation('الموقع الحالي');
        setIsLoading(false);
        Alert.alert('تم', 'تم تحديد موقعك الحالي');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={[styles.backButton, getShadowStyle()]} onPress={onBack}>
              <Ionicons name="chevron-back" size={24} color="#2E3A59" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>تخطي</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>أضف موقعك</Text>
          </View>
          <View style={styles.inputSection}>
            <View style={styles.searchContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="search" size={20} color="#9E9E9E" style={styles.searchIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="بحث..."
                  value={location}
                  onChangeText={setLocation}
                  textAlign="right"
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.locationButton, getShadowStyle()]}
              onPress={handleCurrentLocation}
              disabled={isLoading}
            >
              <Ionicons name="location" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <LinearGradient
              colors={['#e0f7fa', '#b2ebf2', '#80deea']}
              style={styles.mapGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="map-outline" size={72} color="#00BFA5" style={{ opacity: 0.7 }} />
              <Text style={styles.mapText}>الخريطة قادمة قريباً</Text>
              <Text style={styles.mapSubText}>سيتم عرض موقعك هنا</Text>
            </LinearGradient>
          </View>
          {location.trim() && (
            <TouchableOpacity
              style={[
                styles.continueButton,
                getShadowStyle(),
                isLoading && styles.disabledButton,
              ]}
              onPress={handleLocationSelect}
              disabled={isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'جاري التحديد...' : 'تأكيد الموقع'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: { paddingHorizontal: 12, paddingVertical: 8 },
  skipText: { fontSize: 16, color: '#9E9E9E', fontWeight: '500' },
  titleSection: { alignItems: 'center', marginBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#00BFA5',
    textAlign: 'center',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  searchContainer: { flex: 1 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: { marginRight: 8 },
  textInput: { flex: 1, fontSize: 14, color: '#2E3A59', fontWeight: '400' },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 300,
    borderRadius: 16,
    borderWidth: 0,
    marginBottom: 32,
    overflow: 'hidden',
    shadowColor: '#00BFA5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  mapGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '700',
    color: '#009688',
    letterSpacing: 1,
  },
  mapSubText: {
    marginTop: 6,
    fontSize: 15,
    color: '#607D8B',
    fontWeight: '400',
  },
  continueButton: {
    backgroundColor: '#00BFA5',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  disabledButton: { opacity: 0.7 },
  continueButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});

export default LocationComponent;