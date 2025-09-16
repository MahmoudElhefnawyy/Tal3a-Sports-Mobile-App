import { NavigationContainer ,NavigationIndependentTree} from '@react-navigation/native';
import StackNavigator from '../src/routes/screenRoutes';

export default function App() {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}