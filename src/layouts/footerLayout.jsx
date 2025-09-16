import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const getShadowStyle = () => ({
  ...(Platform.OS === 'web'
    ? {
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }
    : Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        android: {
          elevation: 8,
        },
        default: {},
      })),
});

const FooterLayout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const navigateTo = (screen) => {
    console.log('Navigating to:', screen); // Debug navigation
    navigation.navigate(screen);
  };

  const tabs = [
    {
      id: 'home',
      name: 'Home',
      icon: 'home-sharp',
      iconOutline: 'home-outline',
      label: 'الرئيسية',
      screen: 'Home'
    },
    {
      id: 'discovery',
      name: 'Discover',
      icon: 'search-circle',
      iconOutline: 'search-circle-outline',
      label: 'اكتشف',
      screen: 'Discover'
    },
    {
      id: 'groups',
      name: 'Groups',
      icon: 'people-circle',
      iconOutline: 'people-circle-outline',
      label: 'المجموعات',
      screen: 'Group'
    },
    {
      id: 'rewards',
      name: 'Rewards',
      icon: 'gift',
      iconOutline: 'gift-outline',
      label: 'المكافآت',
      screen: 'Reward'
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: 'person',
      iconOutline: 'person-outline',
      label: 'الملف الشخصي',
      screen: 'Profile'
    }
  ];

  const isActiveTab = (tabScreen) => {
    return route.name === tabScreen;
  };

  return (
    <View style={[
      styles.footer, 
      getShadowStyle(),
      { 
        paddingBottom: Math.max(insets.bottom, 8),
        zIndex: 9999, // Ensure footer is above other elements
        minHeight: 80, // Ensure sufficient height
      }
    ]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.footerItem,
            isActiveTab(tab.screen) && styles.activeFooterItem
          ]}
          onPress={() => navigateTo(tab.screen)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name={isActiveTab(tab.screen) ? tab.icon : tab.iconOutline}
              size={24}
              color={isActiveTab(tab.screen) ? '#00BFA5' : '#9CA3AF'}
            />
            {isActiveTab(tab.screen) && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.footerText,
            isActiveTab(tab.screen) && styles.activeFooterText
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: screenWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    minHeight: 56,
  },
  activeFooterItem: {
    backgroundColor: 'rgba(0, 191, 165, 0.1)',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    transform: [{ translateX: -2 }],
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00BFA5',
  },
  footerText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },
  activeFooterText: {
    color: '#00BFA5',
    fontWeight: '600',
  },
});

export default FooterLayout;