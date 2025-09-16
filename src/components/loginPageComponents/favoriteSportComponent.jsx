import { useState } from 'react';
import { Platform } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';

const { width, height } = Dimensions.get('window');

const getShadowStyle = () => Platform.select({
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
});

const FavoriteSportComponent = ({ onNext, onBack }) => {
  const navigation = useNavigation();
  const [selectedSports, setSelectedSports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sportsData = [
    { id: 1, name: 'الكل', icon: 'apps-outline', color: '#00BFA5', isAll: true },
    { id: 2, name: 'Gym', icon: 'barbell-outline', color: '#96CEB4', points: '+950' },
    { id: 3, name: 'سباحة', icon: 'water-outline', color: '#FFEAA7', points: '+100' },
    { id: 4, name: 'كرة الطاولة', icon: 'tennisball-outline', color: '#DDA0DD', points: '+150' },
    { id: 5, name: 'جري', icon: 'walk-outline', color: '#98D8C8', points: '+100' },
    { id: 6, name: 'كرة الطائرة', icon: 'basketball-outline', color: '#F7DC6F', points: '+100' },
    { id: 7, name: 'ركوب الدراجات', icon: 'bicycle-outline', color: '#85C1E9', points: '+100' },
  ];

  const filteredSports = sportsData.filter(sport =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSportSelect = (sport) => {
    if (sport.isAll) {
      setSelectedSports(selectedSports.includes(sport.id) ? [] : [sport.id]);
    } else {
      let newSelected = selectedSports.filter(id => id !== 1);
      if (selectedSports.includes(sport.id)) {
        newSelected = newSelected.filter(id => id !== sport.id);
      } else {
        newSelected = [...newSelected, sport.id];
      }
      setSelectedSports(newSelected);
    }
  };

  const handleContinue = () => {
    if (selectedSports.length === 0) {
      Alert.alert('تنبيه', 'يرجى اختيار رياضة واحدة على الأقل');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home');
    }, 1500);
  };

  const handleSkip = () => {
        navigation.navigate('Home')
  };

  const SportCard = ({ sport }) => {
    const isSelected = selectedSports.includes(sport.id);
    return (
      <TouchableOpacity
        style={[
          styles.sportCard,
          isSelected && styles.selectedSportCard,
          { backgroundColor: isSelected ? sport.color : '#FFFFFF' }
        ]}
        onPress={() => handleSportSelect(sport)}
      >
        <View style={styles.sportContent}>
          <Ionicons name={sport.icon} size={32} color={isSelected ? '#FFFFFF' : sport.color} />
          <Text style={[styles.sportName, { color: isSelected ? '#FFFFFF' : '#2E3A59' }]}>
            {sport.name}
          </Text>
          {sport.points && (
            <Text style={[styles.sportPoints, { color: isSelected ? '#FFFFFF' : sport.color }]}>
              {sport.points}
            </Text>
          )}
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#2E3A59" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>تخطي</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>أضف رياضاتك المفضلة</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="search" size={20} color="#9E9E9E" style={styles.searchIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="بحث..."
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
                textAlign="right"
              />
            </View>
          </View>
        </View>

        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {['الكل', 'Fitness', 'Ball', 'Team'].map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  filter === 'الكل' && selectedSports.includes(1) && styles.activeFilterButton
                ]}
                onPress={() => handleSportSelect(sportsData.find(s => s.name === filter) || sportsData[0])}
              >
                <Text style={[
                  styles.filterText,
                  filter === 'الكل' && selectedSports.includes(1) && styles.activeFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.filterIconButton}>
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsText}>اقتراحات</Text>
        </View>

        <View style={styles.sportsGrid}>
          {filteredSports.slice(1).map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </View>

        {selectedSports.length > 0 && (
          <TouchableOpacity
            style={[styles.continueButton, getShadowStyle(), isLoading && styles.disabledButton]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'جاري الحفظ...' : 'متابعة'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#9E9E9E',
    fontWeight: '500',
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
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
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
  searchIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E3A59',
    fontWeight: '400',
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  filterContainer: {
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  activeFilterButton: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#00BFA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsSection: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  suggestionsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BFA5',
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sportCard: {
    width: (width - 40) / 2 - 6,
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  selectedSportCard: {
    borderColor: 'transparent',
    ...getShadowStyle(),
  },
  sportContent: {
    alignItems: 'center',
    gap: 8,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  sportPoints: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#00BFA5',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default FavoriteSportComponent;