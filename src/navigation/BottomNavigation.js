import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreen, ImageScreen, SettingsScreen} from '../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tarBarActiveTintColor: '#999',
        tabBarInactiveBackgroundColor: '#233530',
        tabBarActiveBackgroundColor: 'green',
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#fff',
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="chat" size={24} color={'#fff'} />
          ),
        }}
      />
      <Tab.Screen
        name="Image"
        component={ImageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="image" size={24} color={'#fff'} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="settings" size={24} color={'#fff'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
