import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';
import LogoImage from '../../assets/images/OnboardingPage/Logo.png';

const { width, height } = Dimensions.get('window');

const LoginComponent = ({ onBack, onNext,onRegister ,onLogin}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getShadowStyle = () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {}, 
    }),
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onNext) onNext(); 
      else navigation.navigate('Home'); 
    }, 1500);
  };

  const handleNFIDLogin = () => {
    Alert.alert('NFID', 'سيتم تسجيل الدخول باستخدام NFID');
    onNext();
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google', 'سيتم تسجيل الدخول باستخدام Google');
    onNext();
  };

  const handleWeb3Login = () => {
    Alert.alert('Web3', 'سيتم تسجيل الدخول باستخدام Web3');
  };

  return (
    <View style={styles.container}>
       <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        // keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack || (() => navigation.goBack())}
          >
            {/* <Ionicons name="chevron-back" size={28} color="#D3D3D3" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>أهلاً بك في</Text>
          <View style={styles.logoContainer}>
            <Image
              source={LogoImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.mainLoginButton, getShadowStyle()]}
          onPress={() => {
            console.log('Main login pressed');
            onNext();
          }}
        >
          <Text style={styles.mainLoginText}>تسجيل الدخول</Text>
        </TouchableOpacity>
        <View style={styles.nfidSection}>
          <TouchableOpacity
          style={[styles.nfidBtn, getShadowStyle()]}
          onPress={() => {
            console.log('Main login pressed');
            onNext();
          }}
        >
          <Text style={styles.nfidTitle}>تسجيل الدخول NFID</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authCard, styles.internetIdentityCard, getShadowStyle()]}
            onPress={handleNFIDLogin}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="shield-outline" size={24} color="#00D4AA" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>INTERNET IDENTITY</Text>
              <Text style={styles.cardDescription}>
                الخيار الأكثر أماناً، يستخدم تشفير البلوكتشين أل
              </Text>
              <Text style={styles.cardDescription}>
                لحماية بيانات كلمات مرور
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authCard, styles.nfidGoogleCard, getShadowStyle()]}
            onPress={handleGoogleLogin}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="triangle-outline" size={24} color="#4285F4" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>NFID + GOOGLE</Text>
              <Text style={styles.cardDescription}>
                تجربة تسجيل دخول مألوفة، استخدم حسابك الحالي
              </Text>
              <Text style={styles.cardDescription}>
                في جوجل للوصول إلى TAL3A
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.web3Section}>
            <Text style={styles.web3Text}>
              جديد على <Text style={styles.web3Bold}>Web3</Text>؟ ننصح بالبدء ب
            </Text>
            <TouchableOpacity onPress={handleGoogleLogin}>
              <Text style={styles.web3Link}>NFID + Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {false && (
          <View style={[styles.formCard, getShadowStyle()]}>
            <TextInput
              style={styles.input}
              placeholder="البريد الإلكتروني"
              placeholderTextColor="#9E9E9E"
              value={email}
              onChangeText={setEmail}
              textAlign="right"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { marginBottom: 0 }]}
                placeholder="كلمة المرور"
                placeholderTextColor="#9E9E9E"
                value={password}
                onChangeText={setPassword}
                textAlign="right"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#9E9E9E"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.submitButton, getShadowStyle()]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overlayContent: {
    flex: 1,
    backgroundColor: 'rgba(248, 249, 250, 0.95)', 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#00D4AA',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: width * 0.6,
    height: 80,
    maxWidth: 280,
  },
  mainLoginButton: {
    backgroundColor: '#00D4AA',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainLoginText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  nfidSection: {
    flex: 1,
  },
  nfidTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D3D3D3',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 12,
    paddingHorizontal:12,
  },
  authCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  internetIdentityCard: {
    backgroundColor: '#E8F8F5',
    borderWidth: 1,
    borderColor: '#B8E6D1',
  },
  nfidGoogleCard: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  cardIcon: {
    marginRight: 16,
    marginLeft: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E3A59',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  web3Section: {
    marginTop: 20,
    alignItems: 'center',
  },
  web3Text: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textDecorationLine: "none",
    marginVertical:10,
  },
  web3Bold: {
    fontWeight: '700',
    color: '#2E3A59',
  },
  web3Link: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#E9ECEF',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#2E3A59',
    textAlign: 'right',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E9ECEF',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  eyeButton: {
    padding: 12,
  },
  submitButton: {
    backgroundColor: '#00D4AA',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default LoginComponent;