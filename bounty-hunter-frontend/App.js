import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

import UserProfileScreen from './screens/TabScreens/UserProfileScreen';
import BountiesListScreen from './screens/TabScreens/BountiesListScreen';
import WelcomeScreen from './screens/SignInScreens/WelcomeScreen';
import SignUpScreen from './screens/SignInScreens/SignUpScreen';
import LoginScreen from './screens/SignInScreens/LoginScreen';
import VerifyEmailScreen from './screens/SignInScreens/VerifyEmailScreen';
import UpdatePasswordScreen from './screens/SignInScreens/UpdatePasswordScreen';
import ReturnLoginScreen from './screens/SignInScreens/ReturnLoginScreen';
import LeaderBoardScreen from './screens/TabScreens/LeaderBoardScreen';
import WishListScreen from './screens/TabScreens/WishListScreen';
import FriendListScreen from './screens/TabScreens/FriendListScreen';
import { store, persistor } from './store/redux/store';
import { GLOBAL_STYLES } from './constants/styles';
import IconButton from './components/UI/IconButton';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
          options={{
          headerShown: false
          }}/>
          <Stack.Screen
          name='SignUpScreen'
          component={SignUpScreen}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
            }}/>
          <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
            }}/>
          <Stack.Screen
          name='VerifyEmailScreen'
          component={VerifyEmailScreen}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
            }}/>
          <Stack.Screen
          name='UpdatePasswordScreen'
          component={UpdatePasswordScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false
            }}/>
          <Stack.Screen
          name='ReturnLoginScreen'
          component={ReturnLoginScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false
            }}/>
      </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  //const username = useSelector(state => state.username);
  //const dispatch = useDispatch();
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({color, size, focused}) => {
        let iconName; 
        switch(route.name) {
          case 'Leaderboard':
            iconName = focused ? 'bar-chart' :
              'bar-chart-outline';
            break;
          case 'Bounties':
            iconName = focused ? 'briefcase' :
               'briefcase-outline';
            break;
          case 'Friends':
            iconName = focused ? 'people' :
             'people-outline';
            break;
          case 'Wishlist':
            iconName = focused ? 'gift' :
              'gift-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' :
              'person-outline';
        }
        return <Ionicons name={iconName} 
          size={size}
          color={color}/>
      },
      tabBarLabel: ({children, color, focused}) => {
        return (
        <Text style={{fontSize: 12, color: {color}, fontWeight: focused ? 'bold' : 'normal'}}>
          {children}
        </Text>)
      },
      tabBarStyle: {
        backgroundColor: GLOBAL_STYLES.colors.brown500,
        color: GLOBAL_STYLES.colors.brown300,
        height: 80,
        // Work in Progress
      }
    })
    }>
      <Tab.Screen 
      name="Leaderboard"
      component={LeaderBoardScreen}
      options={{
        headerTitle: '',
        headerTransparent: true,
        headerShadowVisible: false
      }}/>

      <Tab.Screen 
      name='Bounties'
      component={BountiesListScreen}/>

      <Tab.Screen 
      name="Friends"
      component={FriendListScreen}/>

      <Tab.Screen 
      name='Wishlist'
      component={WishListScreen}/>

      <Tab.Screen 
      name='Profile'
      component={UserProfileScreen}
      options={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: GLOBAL_STYLES.colors.brown300
        },
        headerShadowVisible: false,
        headerRight: () => {
          return (
            <IconButton 
            icon='settings-outline'
            color={GLOBAL_STYLES.colors.blue300}
            onPress={() => console.log('setting page')}
            iconSize={24}
            />
          )
        },
        headerRightContainerStyle: {
          paddingRight: 14 
        }
      }}/>
    </Tab.Navigator>
  )
}

function Root() {
  const authToken = useSelector(state => state.authToken);
  // console.log(authToken.authToken)

  if (authToken.authToken) {
    return <AuthenticatedStack />
  } else {
    return <AuthStack />
  }
}

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Root />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </>
    
  );
};

