import React from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  useSettingsStore,
  NotificationSettings,
} from "@/store/settingsStore";
import * as Haptics from "expo-haptics";

interface NotificationItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

function NotificationItem({
  icon,
  iconColor,
  iconBg,
  label,
  description,
  value,
  onValueChange,
}: NotificationItemProps) {
  const hapticEnabled = useSettingsStore((s) => s.appSettings.hapticFeedback);

  const handleChange = (val: boolean) => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onValueChange(val);
  };

  return (
    <View className="flex-row items-center py-4 px-1">
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View className="flex-1 mr-3">
        <Text className="text-gray-800 font-semibold text-[15px]">
          {label}
        </Text>
        <Text className="text-gray-400 text-xs mt-0.5">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={handleChange}
        trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
        thumbColor={value ? "#2563EB" : "#F3F4F6"}
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mt-6 mb-2">
      {title}
    </Text>
  );
}

export default function Notifications() {
  const router = useRouter();
  const { notifications, setNotification, resetNotifications } =
    useSettingsStore();

  const handleReset = () => {
    Alert.alert(
      "Reset Notifications",
      "Are you sure you want to reset all notification preferences to default?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetNotifications(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-gray-800 -ml-10">
          Notifications
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Illustration Banner */}
        <View className="bg-blue-50 rounded-2xl p-5 mb-2 flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-4">
            <Ionicons name="notifications" size={24} color="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-blue-900 font-bold text-base">
              Stay in the Loop
            </Text>
            <Text className="text-blue-600 text-xs mt-0.5">
              Customize what notifications you receive
            </Text>
          </View>
        </View>

        {/* General */}
        <SectionHeader title="General" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <NotificationItem
            icon="notifications-outline"
            iconColor="#2563EB"
            iconBg="#DBEAFE"
            label="Push Notifications"
            description="Receive push notifications on your device"
            value={notifications.pushNotifications}
            onValueChange={(v) => setNotification("pushNotifications", v)}
          />
          <View className="h-[1px] bg-gray-200 mx-1" />
          <NotificationItem
            icon="mail-outline"
            iconColor="#7C3AED"
            iconBg="#EDE9FE"
            label="Email Notifications"
            description="Get important updates via email"
            value={notifications.emailNotifications}
            onValueChange={(v) => setNotification("emailNotifications", v)}
          />
        </View>

        {/* Property Alerts */}
        <SectionHeader title="Property Alerts" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <NotificationItem
            icon="home-outline"
            iconColor="#059669"
            iconBg="#D1FAE5"
            label="Property Alerts"
            description="Alerts for properties matching your criteria"
            value={notifications.propertyAlerts}
            onValueChange={(v) => setNotification("propertyAlerts", v)}
          />
          <View className="h-[1px] bg-gray-200 mx-1" />
          <NotificationItem
            icon="trending-down-outline"
            iconColor="#DC2626"
            iconBg="#FEE2E2"
            label="Price Drop Alerts"
            description="Get notified when a saved property's price drops"
            value={notifications.priceDropAlerts}
            onValueChange={(v) => setNotification("priceDropAlerts", v)}
          />
          <View className="h-[1px] bg-gray-200 mx-1" />
          <NotificationItem
            icon="sparkles-outline"
            iconColor="#D97706"
            iconBg="#FEF3C7"
            label="New Listings"
            description="Be the first to know about new properties"
            value={notifications.newListingAlerts}
            onValueChange={(v) => setNotification("newListingAlerts", v)}
          />
        </View>

        {/* Communication */}
        <SectionHeader title="Communication" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <NotificationItem
            icon="chatbubble-ellipses-outline"
            iconColor="#0891B2"
            iconBg="#CFFAFE"
            label="Messages"
            description="Notifications for new messages from agents"
            value={notifications.messageNotifications}
            onValueChange={(v) => setNotification("messageNotifications", v)}
          />
          <View className="h-[1px] bg-gray-200 mx-1" />
          <NotificationItem
            icon="megaphone-outline"
            iconColor="#9333EA"
            iconBg="#F3E8FF"
            label="Marketing Emails"
            description="Promotional offers and featured listings"
            value={notifications.marketingEmails}
            onValueChange={(v) => setNotification("marketingEmails", v)}
          />
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          onPress={handleReset}
          className="mt-8 flex-row items-center justify-center py-4 rounded-2xl border border-gray-200 bg-gray-50"
        >
          <Ionicons
            name="refresh-outline"
            size={18}
            color="#6B7280"
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-500 font-semibold text-sm">
            Reset to Defaults
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
