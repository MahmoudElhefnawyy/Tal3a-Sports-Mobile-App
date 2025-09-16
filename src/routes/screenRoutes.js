import { useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from '../screens/onboardingScreen'; 
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import DiscoverScreen from '../screens/discoverScreen';
import GroupScreen from '../screens/groupScreen';
import ProfileScreen from '../screens/profileScreen'
import RewardScreen from '../screens/rewardScreen';
import { Colors } from '../constants/colors';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <SafeAreaProvider>
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false, cardStyle: { backgroundColor: theme.background }}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Group" component={GroupScreen} />
      <Stack.Screen name="Reward" component={RewardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
    </SafeAreaProvider>
  );
}