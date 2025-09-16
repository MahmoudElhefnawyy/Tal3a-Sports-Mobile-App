import { useState, useContext } from 'react';
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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeContext } from '../../contexts/homeContext';

const { width } = Dimensions.get('window');

const getShadowStyle = () => ({
  ...(Platform.OS === 'web'
    ? {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }
    : Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
        default: {},
      })),
});

const MainBodyComponent = ({ onNext, onBack }) => {
  const navigation = useNavigation();
  const { events, groups, loading, error } = useContext(HomeContext);
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
      }, 2000);
    }
  };

  const EventCard = ({ event }) => (
    <View style={[styles.eventCard, getShadowStyle()]}>
      <ImageBackground
        source={{ uri: event.image || 'https://via.placeholder.com/220x280' }}
        style={styles.eventImage}
        imageStyle={styles.eventImageStyle}
      >
        <View style={styles.eventOverlay}>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventLocation}>{event.location}</Text>
            <Text style={styles.eventType}>{event.type}</Text>
            <View style={styles.eventStats}>
              <Text style={styles.eventStat}>
                👥 {event.going} مشاركون، {event.maybes} ربما
              </Text>
            </View>
            <View
              style={[
                styles.eventStatus,
                event.status === 'متاح' ? styles.available : styles.notAvailable,
              ]}
            >
              <Text
                style={[
                  styles.eventStatusText,
                  event.status === 'متاح'
                    ? styles.availableText
                    : styles.notAvailableText,
                ]}
              >
                {event.status}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const GroupCard = ({ group }) => (
    <View style={[styles.groupCard, getShadowStyle()]}>
      <ImageBackground
        source={{ uri: group.image || 'https://via.placeholder.com/180x200' }}
        style={styles.groupImage}
        imageStyle={styles.groupImageStyle}
      >
        <View style={styles.groupOverlay}>
          <View style={styles.groupContent}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <Text style={styles.groupLocation}>{group.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <ScrollView
      style={styles.scrollContent}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>مرحبًا بعودتك!</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00BFA5" />
          <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>الفعاليات المحفوظة</Text>
              <TouchableOpacity>
                <Text style={styles.showAllText}>عرض الكل</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {events.length > 0 ? (
                events.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <Text style={styles.noDataText}>لا توجد فعاليات متاحة</Text>
              )}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>المجموعات</Text>
              <TouchableOpacity>
                <Text style={styles.showAllText}>عرض الكل</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {groups.length > 0 ? (
                groups.map((group) => <GroupCard key={group.id} group={group} />)
              ) : (
                <Text style={styles.noDataText}>لا توجد مجموعات متاحة</Text>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    ...(Platform.OS === 'web' ? { overflow: 'auto' } : {}),
  },
  scrollContentContainer: {
    paddingBottom: 20, // Reduced from 100 to 20
    flexGrow: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00BFA5',
    marginBottom: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  showAllText: {
    fontSize: 14,
    color: '#00BFA5',
    textDecorationLine: 'none',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  eventCard: {
    width: 220,
    height: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventImageStyle: {
    borderRadius: 16,
  },
  eventOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  eventType: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  eventStats: {
    marginBottom: 12,
  },
  eventStat: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  eventStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  available: {
    backgroundColor: '#00BFA5',
  },
  notAvailable: {
    backgroundColor: '#FF6B6B',
  },
  eventStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  availableText: {
    color: '#FFFFFF',
  },
  notAvailableText: {
    color: '#FFFFFF',
  },
  groupCard: {
    width: 180,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  groupImageStyle: {
    borderRadius: 16,
  },
  groupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  groupContent: {
    padding: 16,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  groupLocation: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#00BFA5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  noDataText: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
  },
});

export default MainBodyComponent;