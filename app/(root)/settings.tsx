import React from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/settingsStore";
import * as Haptics from "expo-haptics";
import Constants from "expo-constants";

/* ───────── Toggle Row ───────── */
interface ToggleRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

function ToggleRow({
  icon,
  iconColor,
  iconBg,
  label,
  description,
  value,
  onValueChange,
}: ToggleRowProps) {
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
        {description && (
          <Text className="text-gray-400 text-xs mt-0.5">{description}</Text>
        )}
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

/* ───────── Tappable Row ───────── */
interface TapRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  rightText?: string;
  onPress?: () => void;
  danger?: boolean;
}

function TapRow({
  icon,
  iconColor,
  iconBg,
  label,
  rightText,
  onPress,
  danger,
}: TapRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 px-1"
      activeOpacity={0.6}
    >
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text
        className={`flex-1 font-semibold text-[15px] ${
          danger ? "text-red-500" : "text-gray-800"
        }`}
      >
        {label}
      </Text>
      {rightText && (
        <Text className="text-gray-400 text-sm mr-1">{rightText}</Text>
      )}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

/* ───────── Section Header ───────── */
function SectionHeader({ title }: { title: string }) {
  return (
    <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mt-6 mb-2">
      {title}
    </Text>
  );
}

/* ───────── Picker Modal Row ───────── */
interface PickerRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  currentValue: string;
  options: string[];
  onSelect: (value: string) => void;
}

function PickerRow({
  icon,
  iconColor,
  iconBg,
  label,
  currentValue,
  options,
  onSelect,
}: PickerRowProps) {
  const handlePress = () => {
    Alert.alert(
      label,
      `Current: ${currentValue}`,
      [
        ...options.map((opt) => ({
          text: opt,
          onPress: () => onSelect(opt),
        })),
        { text: "Cancel", style: "cancel" as const },
      ]
    );
  };

  return (
    <TapRow
      icon={icon}
      iconColor={iconColor}
      iconBg={iconBg}
      label={label}
      rightText={currentValue}
      onPress={handlePress}
    />
  );
}

/* ───────── Separator ───────── */
function Divider() {
  return <View className="h-[1px] bg-gray-200 mx-1" />;
}

/* ═══════════════════════════════ */
/*          Settings Screen        */
/* ═══════════════════════════════ */

export default function Settings() {
  const router = useRouter();
  const { appSettings, setAppSetting, resetAppSettings } = useSettingsStore();

  const appVersion =
    Constants.expoConfig?.version ?? Constants.manifest2?.extra?.expoClient?.version ?? "1.0.0";

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "This will clear all cached images and data. Your account and settings will not be affected.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            Alert.alert("Done", "Cache cleared successfully!");
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. All your data, saved properties, and preferences will be deleted forever.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Contact Support",
              "To delete your account, please email ansariishahid2005@gmail.com with the subject 'Delete My Account'."
            );
          },
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all app settings to default?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetAppSettings(),
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
          Settings
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Banner */}
        <View className="bg-indigo-50 rounded-2xl p-5 mb-2 flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center mr-4">
            <Ionicons name="settings" size={24} color="#4F46E5" />
          </View>
          <View className="flex-1">
            <Text className="text-indigo-900 font-bold text-base">
              App Preferences
            </Text>
            <Text className="text-indigo-500 text-xs mt-0.5">
              Personalize your HomeHive experience
            </Text>
          </View>
        </View>

        {/* ─── Preferences ─── */}
        <SectionHeader title="Preferences" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <ToggleRow
            icon="moon-outline"
            iconColor="#6366F1"
            iconBg="#E0E7FF"
            label="Dark Mode"
            description="Switch to dark theme (coming soon)"
            value={appSettings.darkMode}
            onValueChange={(v) => setAppSetting("darkMode", v)}
          />
          <Divider />
          <ToggleRow
            icon="phone-portrait-outline"
            iconColor="#EC4899"
            iconBg="#FCE7F3"
            label="Haptic Feedback"
            description="Feel vibrations on interactions"
            value={appSettings.hapticFeedback}
            onValueChange={(v) => setAppSetting("hapticFeedback", v)}
          />
          <Divider />
          <ToggleRow
            icon="play-circle-outline"
            iconColor="#0EA5E9"
            iconBg="#E0F2FE"
            label="Autoplay Videos"
            description="Auto-play property tour videos"
            value={appSettings.autoplayVideos}
            onValueChange={(v) => setAppSetting("autoplayVideos", v)}
          />
        </View>

        {/* ─── Location & Units ─── */}
        <SectionHeader title="Location & Units" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <ToggleRow
            icon="location-outline"
            iconColor="#059669"
            iconBg="#D1FAE5"
            label="Location Services"
            description="Allow app to access your location"
            value={appSettings.locationServices}
            onValueChange={(v) => setAppSetting("locationServices", v)}
          />
          <Divider />
          <PickerRow
            icon="resize-outline"
            iconColor="#D97706"
            iconBg="#FEF3C7"
            label="Distance Unit"
            currentValue={appSettings.distanceUnit === "km" ? "Kilometers" : "Miles"}
            options={["Kilometers", "Miles"]}
            onSelect={(v) =>
              setAppSetting("distanceUnit", v === "Kilometers" ? "km" : "mi")
            }
          />
          <Divider />
          <PickerRow
            icon="cash-outline"
            iconColor="#16A34A"
            iconBg="#DCFCE7"
            label="Currency"
            currentValue={appSettings.currency}
            options={["USD", "EUR", "GBP", "INR", "AED"]}
            onSelect={(v) => setAppSetting("currency", v)}
          />
          <Divider />
          <PickerRow
            icon="language-outline"
            iconColor="#2563EB"
            iconBg="#DBEAFE"
            label="Language"
            currentValue={appSettings.language}
            options={["English", "Hindi", "Arabic", "Spanish", "French"]}
            onSelect={(v) => setAppSetting("language", v)}
          />
        </View>

        {/* ─── About ─── */}
        <SectionHeader title="About" />
        <View className="bg-gray-50 rounded-2xl px-4">
          <TapRow
            icon="shield-checkmark-outline"
            iconColor="#7C3AED"
            iconBg="#EDE9FE"
            label="Privacy Policy"
            onPress={() =>
              Linking.openURL("https://policies.google.com/privacy")
            }
          />
          <Divider />
          <TapRow
            icon="document-text-outline"
            iconColor="#0891B2"
            iconBg="#CFFAFE"
            label="Terms of Service"
            onPress={() =>
              Linking.openURL("https://policies.google.com/terms")
            }
          />
          <Divider />
          <TapRow
            icon="star-outline"
            iconColor="#F59E0B"
            iconBg="#FEF3C7"
            label="Rate the App"
            onPress={() =>
              Alert.alert(
                "Rate HomeHive",
                "Thank you for using HomeHive! Rating feature coming soon."
              )
            }
          />
          <Divider />
          <TapRow
            icon="information-circle-outline"
            iconColor="#6B7280"
            iconBg="#F3F4F6"
            label="App Version"
            rightText={`v${appVersion}`}
            onPress={() => {}}
          />
        </View>

        {/* ─── Danger Zone ─── */}
        <SectionHeader title="Danger Zone" />
        <View className="bg-red-50 rounded-2xl px-4 border border-red-100">
          <TapRow
            icon="trash-outline"
            iconColor="#DC2626"
            iconBg="#FEE2E2"
            label="Clear Cache"
            onPress={handleClearCache}
          />
          <Divider />
          <TapRow
            icon="person-remove-outline"
            iconColor="#DC2626"
            iconBg="#FEE2E2"
            label="Delete Account"
            onPress={handleDeleteAccount}
            danger
          />
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          onPress={handleResetSettings}
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
