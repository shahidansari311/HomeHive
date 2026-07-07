import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor="#2563EB"
      badgeBackgroundColor="#EF4444"
      labelStyle={{
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "600",
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon src={require("../../../assets/icons/home.png")}/>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="search">
        <Icon src={require("../../../assets/icons/magnifying-glass.png")}/>
        <Label>Search</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="saved">
        <Icon src={require("../../../assets/icons/signs.png")}/>
        <Label>Saved</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon src={require("../../../assets/icons/user.png")}/>
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
