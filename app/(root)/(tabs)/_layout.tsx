import { Tabs } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { Image, View, Platform } from 'react-native';

const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
    <Image 
      source={icon} 
      resizeMode="contain" 
      style={{ 
        width: 24, 
        height: 24, 
        tintColor: focused ? '#2563EB' : '#8E8E93' 
      }} 
    />
  </View>
);

export default function TabLayout() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          minHeight: Platform.OS === 'ios' ? 88 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={require('../../../assets/icons/home.png')} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={require('../../../assets/icons/magnifying-glass.png')} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="create"
        options={{
          title: 'Add Property',
          href: isAdmin ? '/create' : null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={require('../../../assets/icons/add.png')} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={require('../../../assets/icons/signs.png')} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={require('../../../assets/icons/user.png')} />
          ),
        }}
      />
    </Tabs>
  );
}
