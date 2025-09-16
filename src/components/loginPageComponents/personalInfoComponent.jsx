import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform, 
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';

const { width, height } = Dimensions.get('window');

const PersonalInfoComponent = ({ onNext, onBack }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = async () => {
    const { fullName, gender } = formData;
    
    if (!fullName || !gender) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  const GenderButton = ({ gender, icon, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.genderButton, selected && styles.selectedGenderButton]}
      onPress={() => onPress(gender)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={selected ? '#FFFFFF' : '#9E9E9E'} 
        style={styles.genderIcon}
      />
      <Text style={[styles.genderButtonText, selected && styles.selectedGenderButtonText]}>
        {gender}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
       
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#2E3A59" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>أنشئ حسابك</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="الاسم بالكامل"
                placeholderTextColor="#9E9E9E"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                textAlign="right"
              />
            </View>
          </View>

          {/* Gender Selection */}
          <View style={styles.genderSection}>
            <GenderButton
              gender="أنثى"
              icon="woman-outline"
              selected={formData.gender === 'أنثى'}
              onPress={(gender) => handleInputChange('gender', gender)}
            />
            <GenderButton
              gender="ذكر"
              icon="man-outline"
              selected={formData.gender === 'ذكر'}
              onPress={(gender) => handleInputChange('gender', gender)}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.disabledButton]}
            onPress={handleNext}
            disabled={isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
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
  titleSection: {
    alignItems: 'center',
    marginVertical: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#00BFA5',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  inputContainer: {
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  inputIcon: {
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E3A59',
    fontWeight: '400',
  },
  genderSection: {
    flexDirection: 'column', // Changed to column to stack buttons
    gap: 16,
    marginTop: 20,
  },
  genderButton: {
    height: 80,
    borderRadius: 12,
    backgroundColor: '#FFFFFF', // White background as per request
    borderWidth: 1,
    borderColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  selectedGenderButton: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  genderIcon: {
    marginBottom: 8,
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  selectedGenderButtonText: {
    color: '#FFFFFF',
  },
  bottomSection: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#00BFA5',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00BFA5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
});

export default PersonalInfoComponent;