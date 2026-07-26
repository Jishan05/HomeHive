import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';
import PropertyListScreen from '../screens/property/PropertyListScreen';
import PropertyDetailScreen from '../screens/property/PropertyDetailScreen';
import FullGalleryScreen from '../screens/property/FullGalleryScreen';
import MyPropertiesScreen from '../screens/profile/MyPropertiesScreen';
import ScheduledToursScreen from '../screens/profile/ScheduledToursScreen';
import NotificationScreen from '../screens/common/NotificationScreen';
import SearchScreen from '../screens/property/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="PropertyList" component={PropertyListScreen} />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
      <Stack.Screen name="FullGallery" component={FullGalleryScreen} />
      <Stack.Screen name="MyProperties" component={MyPropertiesScreen} />
      <Stack.Screen name="ScheduledTours" component={ScheduledToursScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
