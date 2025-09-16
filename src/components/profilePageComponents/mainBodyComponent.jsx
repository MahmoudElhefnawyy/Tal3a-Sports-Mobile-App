import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../../contexts/profileContext';
import ProfilePicture from '../../assets/images/ProfilePage/ProfilePicture.png';

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
  const { profile, upcomingEvents, pastEvents, hostedEvents, achievements, loading, error } = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || 'أحمد حسان');
  const [selectedTab, setSelectedTab] = useState('General');
  const [selectedEventTab, setSelectedEventTab] = useState('Upcoming');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const getEventsData = () => {
    switch (selectedEventTab) {
      case 'Upcoming': return upcomingEvents || [];
      case 'Past Events': return pastEvents || [];
      case 'Hosted': return hostedEvents || [];
      default: return upcomingEvents || [];
    }
  };

  useEffect(() => {
    console.log('Component Data:', { profile, upcomingEvents, pastEvents, hostedEvents, achievements });
  }, [profile, upcomingEvents, pastEvents, hostedEvents, achievements]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
          </View>
          <View style={{ height: 200 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
          <View style={{ height: 200 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  console.log('Rendering Events:', getEventsData());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: 200, minHeight: Dimensions.get('window').height }}
        showsVerticalScrollIndicator={true}
        onContentSizeChange={(width, height) => console.log('Content Size:', width, height)}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={ProfilePicture} style={styles.profilePicture} resizeMode="cover" />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{isEditing ? <TextInput style={styles.editInput} value={name} onChangeText={setName} /> : name}</Text>
              <View style={styles.ratingsContainer}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.ratingText}>4.8 تقييم</Text>
                </View>
                <View style={[styles.ratingBadge, styles.greenBadge]}>
                  <Ionicons name="checkmark-circle" size={14} color="#00BFA5" />
                  <Text style={[styles.ratingText, styles.greenText]}>4.8 تقييم</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editIconButton} onPress={handleEditToggle}>
              <Ionicons name="create-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Wallet Section */}
        <View style={[styles.section, styles.walletSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.walletInfo}>
              <Ionicons name="wallet-outline" size={24} color="#6B7280" />
              <View style={styles.walletDetails}>
                <Text style={styles.walletTitle}>المحفظة</Text>
                <Text style={styles.walletAddress}>{profile?.email || '0x1234...568'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editIconButton}>
              <Ionicons name="create-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.walletBalance}>
            <View>
              <Text style={styles.balanceAmount}>{profile?.points || 125.0} <Text style={styles.currency}>رياضة</Text></Text>
              <Text style={styles.balanceUsd}>+ 2,510 جنيه</Text>
            </View>
            <TouchableOpacity style={styles.topUpButton}>
              <Text style={styles.topUpText}>شحن</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Events Tabs */}
        <View style={styles.tabsContainer}>
          {['Upcoming', 'Past Events', 'Hosted'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.tab, selectedEventTab === tab && styles.activeTab]}
              onPress={() => setSelectedEventTab(tab)}
            >
              <Text style={[styles.tabText, selectedEventTab === tab && styles.activeTabText]}>
                {tab === 'Upcoming' ? 'القادمة' : tab === 'Past Events' ? 'الأحداث السابقة' : 'مستضافة'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events List */}
        <View style={[styles.eventsContainer, { minHeight: 100 }]}>
          {getEventsData().length > 0 ? (
            getEventsData().map((event, index) => (
              <View key={event.id || `event-${index}`} style={[styles.eventCard, getShadowStyle()]}>
                <View style={styles.eventStatus}>
                  <View style={[styles.statusIndicator, { backgroundColor: event.statusColor || '#6B7280' }]} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title || 'No title'}</Text>
                  <View style={styles.eventMeta}>
                    <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                    <Text style={styles.eventDate}>{event.date || 'No date'}</Text>
                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                    <Text style={styles.eventTime}>{event.time || 'No time'}</Text>
                  </View>
                  <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{event.location || 'No location'}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.statusButton, { backgroundColor: event.statusColor || '#6B7280' }]}>
                  <Text style={styles.statusButtonText}>{event.status || 'No status'}</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>لا توجد أحداث حاليًا</Text>
          )}
        </View>

        {/* Achievements Section */}
        <View style={[styles.section, styles.achievementsSection]}>
          <View style={styles.sectionHeaderWithIcon}>
            <Ionicons name="trophy" size={20} color="#00BFA5" />
            <Text style={styles.sectionTitle}>الإنجازات</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Ionicons name={achievement.unlocked ? 'checkmark-circle' : 'lock-closed'} size={24} color={achievement.unlocked ? '#00BFA5' : '#6B7280'} />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rewards Section */}
        <View style={[styles.section, styles.rewardsSection]}>
          <View style={styles.rewardsHeader}>
            <View style={styles.rewardsInfo}>
              <Ionicons name="gift-outline" size={20} color="#6B7280" />
              <Text style={styles.rewardsTitle}>المكافآت</Text>
            </View>
            <Text style={styles.pointsText}>{profile?.points || 766} نقطة</Text>
          </View>
        </View>

        {/* Vouchers Section */}
        <TouchableOpacity style={[styles.section, styles.vouchersSection]}>
          <View style={styles.vouchersHeader}>
            <View style={styles.vouchersInfo}>
              <Ionicons name="ticket-outline" size={20} color="#6B7280" />
              <Text style={styles.vouchersTitle}>القسائم</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>

        {/* Settings Tabs */}
        <View style={styles.settingsTabsContainer}>
          {['General', 'Activity'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.settingsTab, selectedTab === tab && styles.activeSettingsTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.settingsTabText, selectedTab === tab && styles.activeSettingsTabText]}>
                {tab === 'General' ? 'عام' : 'النشاط'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Menu */}
        <View style={styles.settingsMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الإعدادات</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-add-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>دعوة صديق</Text>
            </View>
            <Text style={styles.pointsBonus}>+50 نقطة</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>حول التطبيق</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الحصول على مساعدة</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    ...(Platform.OS === 'web' ? { overflow: 'auto' } : {}),
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    marginTop: 20,
    marginRight: 200,
  },
  editInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#6B7280',
    marginBottom: 20,
    marginTop: 20,
    marginRight: 200,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  greenBadge: {
    backgroundColor: '#E0F7F5',
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  greenText: {
    color: '#00BFA5',
  },
  editIconButton: {
    padding: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    ...getShadowStyle(),
  },
  walletSection: {
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletDetails: {
    flex: 1,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  walletAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  currency: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceUsd: {
    fontSize: 12,
    color: '#00BFA5',
    marginTop: 2,
  },
  topUpButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  topUpText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    ...getShadowStyle(),
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '500',
  },
  eventsContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 255, 0, 0.1)', // Debug: Green background
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
  },
  eventStatus: {
    marginRight: 12,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  eventContent: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  achievementsSection: {
    backgroundColor: '#FFFFFF',
  },
  sectionHeaderWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  achievementsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#E0F7F5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    color: '#00BFA5',
    fontWeight: '500',
    textAlign: 'center',
  },
  rewardsSection: {
    backgroundColor: '#FFFFFF',
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardsTitle: {
    fontSize: 16,
    color: '#333',
  },
  pointsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  vouchersSection: {
    backgroundColor: '#FFFFFF',
  },
  vouchersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vouchersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vouchersTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingsTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
  },
  settingsTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeSettingsTab: {
    backgroundColor: '#FFFFFF',
    ...getShadowStyle(),
  },
  settingsTabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeSettingsTabText: {
    color: '#333',
    fontWeight: '500',
  },
  settingsMenu: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    ...getShadowStyle(),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  pointsBonus: {
    fontSize: 12,
    color: '#00BFA5',
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
  noEventsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    padding: 16,
  },
});

export default MainBodyComponent;