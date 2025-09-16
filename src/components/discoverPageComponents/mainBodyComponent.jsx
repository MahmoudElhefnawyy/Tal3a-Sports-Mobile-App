import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DiscoverContext } from '../../contexts/discoverContext';

const { width, height } = Dimensions.get('window');

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
  const { featuredEvents, trendingGroups, loading, error } = useContext(DiscoverContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement search logic if needed
  };

  const handleJoinEvent = () => {
    // Implement join event logic
  };

  const handleJoinGroup = () => {
    // Implement join group logic
  };

  const EventCard = ({ event }) => (
    <View style={[styles.eventCard, getShadowStyle()]}>
      <Image source={{ uri: event.image }} style={styles.eventImage} resizeMode="cover" />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
        <View style={styles.eventPriceContainer}>
          <Text style={styles.eventPrice}>{event.price}</Text>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
            <Text style={styles.joinButtonText}>انضم</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const GroupCard = ({ group }) => (
    <View style={[styles.groupCard, getShadowStyle()]}>
      <Image source={{ uri: group.image }} style={styles.groupImage} resizeMode="cover" />
      <View style={styles.groupContent}>
        <Text style={styles.groupTitle}>{group.title}</Text>
        <Text style={styles.groupMembers}>{group.members}</Text>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
          <Text style={styles.joinButtonText}>انضم الان</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="ما الرياضة التي تريدها؟"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionText}>القاهرة</Text>
        <Text style={styles.suggestionText}>الجيزة</Text>
        <Text style={styles.suggestionText}>الأسكندرية</Text>
        <Text style={styles.suggestionText}>بورسعيد</Text>
        <Text style={styles.suggestionText}>مطروح</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الفعاليات المميزة</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('Discover')}>
                <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
              </TouchableOpacity>
            </View>
          ) : featuredEvents.length > 0 ? (
            featuredEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <Text style={styles.noDataText}>لا توجد فعاليات متاحة</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>المجموعات الرائجة</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupList}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('Discover')}>
                <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
              </TouchableOpacity>
            </View>
          ) : trendingGroups.length > 0 ? (
            trendingGroups.map((group) => <GroupCard key={group.id} group={group} />)
          ) : (
            <Text style={styles.noDataText}>لا توجد مجموعات متاحة</Text>
          )}
        </View>
      </View>
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    padding: 8,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  suggestionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#00BFA5',
    textDecorationLine: 'none',
  },
  horizontalScroll: {
    paddingVertical: 8,
  },
  eventCard: {
    width: 200,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#D1D5DB',
    overflow: 'hidden',
  },
  eventImage: {
    width: '100',
    height: '60%',
  },
  eventContent: {
    padding: 8,
    justifyContent: 'space-between',
    height: '40%',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPrice: {
    fontSize: 14,
    color: '#333',
  },
  joinButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  groupList: {
    flexDirection: 'column',
    gap: 14,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  groupContent: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  groupMembers: {
    fontSize: 12,
    color: '#6B7280',
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
  bottomSpacing: {
    height: 80,
  },
});

export default MainBodyComponent;