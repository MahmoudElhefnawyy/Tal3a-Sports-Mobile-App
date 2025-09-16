import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GroupContext } from '../../contexts/groupContext';

const { width } = Dimensions.get('window');

const getShadowStyle = () => ({
  ...(Platform.OS === 'web'
    ? { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }
    : Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: { elevation: 4 },
        default: {},
      })),
});

const MainBodyComponent = () => {
  const { groups, loading, error } = useContext(GroupContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const [locationFilter, setLocationFilter] = useState('الكل');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const sportsTypes = ['الكل', 'كرة القدم', 'الدراجات', 'كرة الطائرة', 'التنس'];
  const locations = ['الكل', 'القاهرة', 'الجيزة', 'الأسكندرية', 'حلوان'];

  const filteredGroups = groups.filter(group => 
    (selectedType === 'الكل' || group.type === selectedType) &&
    (locationFilter === 'الكل' || group.location.includes(locationFilter)) &&
    (searchQuery === '' || group.title.toLowerCase().includes(searchQuery.toLowerCase()) || group.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinGroup = (group) => {
    Alert.alert('Join Group', `You are joining ${group.title}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Join', onPress: () => console.log(`Joined ${group.title} (ID: ${group.id})`) },
    ]);
  };

  const GroupCard = ({ group }) => (
    <View style={[styles.groupCard, getShadowStyle()]}>
      <Image 
        source={group.image ? { uri: group.image } : require('../../assets/images/HomePage/group-1.png')} 
        style={styles.groupImage} 
        resizeMode="cover"
        onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)} // Debug image load
      />
      <View style={styles.groupContent}>
        <Text style={styles.groupTitle} numberOfLines={1}>{group.title}</Text>
        <Text style={styles.groupLocation} numberOfLines={1}>{group.location}</Text>
        <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinGroup(group)}>
          <Text style={styles.joinButtonText}>انضم</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.scrollContent}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Container */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="ابحث عن مجموعة"
          placeholderTextColor="#9CA3AF"
        />
        <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
      </View>

      {/* Sports Types Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportsTypesContainer}>
        {sportsTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, selectedType === type && styles.selectedTypeButton]}
            onPress={() => {
              setSelectedType(type);
              console.log(`Selected type: ${type}`); // Debug log
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.typeText, selectedType === type && styles.selectedTypeText]} numberOfLines={1}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Location Filter */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setIsLocationOpen(!isLocationOpen)}>
        <Text style={styles.filterText}>{locationFilter}</Text>
        <Ionicons name={isLocationOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#333" />
      </TouchableOpacity>

      {/* Location Dropdown */}
      {isLocationOpen && (
        <View style={styles.dropdown}>
          {locations.map((loc) => (
            <TouchableOpacity 
              key={loc} 
              style={styles.dropdownItem} 
              onPress={() => { 
                setLocationFilter(loc); 
                setIsLocationOpen(false); 
              }}
            >
              <Text style={styles.dropdownText}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Groups Section */}
      <View style={styles.groupSection}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))
        ) : (
          <Text style={styles.noDataText}>لا توجد مجموعات متاحة</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    ...getShadowStyle(),
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
  sportsTypesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 40,
  },
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F0F4F8',
    borderRadius: 20,
    marginRight: 8,
    height: '100%',
    justifyContent: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#00BFA5',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F4F8',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 16,
    ...getShadowStyle(),
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  groupSection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  groupCard: {
    width: '100%',
    height: 150, // Increased from 120 to accommodate content and button
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  groupImage: {
    width: '100%', // Fixed typo from '100'
    height: '20%', // 90px of 150px
  },
  groupContent: {
    padding: 8,
    height: '70%', 
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  groupLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
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
  },
  noDataText: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
  },
});

export default MainBodyComponent;