import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Platform, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RewardContext } from '../../contexts/rewardContext';
import BackgroundImage from '../../assets/images/OnboardingPage/BackgroundImage.png';

const { width, height } = Dimensions.get('window');

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
  const { rewards, loading, error } = useContext(RewardContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRedeem = (points) => {
    Alert.alert('استبدال المكافأة', `تم استبدال ${points} نقطة!`, [
      { text: 'حسنًا', style: 'default' },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>جارٍ تحميل البيانات...</Text>
          </View>
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={BackgroundImage} style={styles.backgroundImage} resizeMode="cover" />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>نقاطك: 750</Text>
          <TouchableOpacity style={styles.historyButton}>
            <Ionicons name="time" size={20} color="#FFFFFF" />
            <Text style={styles.historyText}>سجل المكافآت</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الجوائز المتاحة</Text>
          {rewards.map((reward) => (
            <View key={reward.id} style={[styles.rewardCard, getShadowStyle()]}>
              <Image source={reward.image ? { uri: reward.image } : require('../../assets/images/RewardPage/badge-1.jpg')} style={styles.rewardImage} resizeMode="cover" />
              <View style={styles.rewardContent}>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardPoints}>{reward.points} نقطة</Text>
                <TouchableOpacity style={styles.redeemButton} onPress={() => handleRedeem(reward.points)}>
                  <Text style={styles.redeemText}>استبدال</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00BFA5',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFA5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  historyText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00BFA5',
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  rewardContent: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 4,
  },
  redeemButton: {
    backgroundColor: '#00BFA5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  redeemText: {
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
  bottomSpacing: {
    height: 100,
  },
});

export default MainBodyComponent;