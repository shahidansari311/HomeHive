import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  propertyAlerts: boolean;
  priceDropAlerts: boolean;
  newListingAlerts: boolean;
  messageNotifications: boolean;
  marketingEmails: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  hapticFeedback: boolean;
  locationServices: boolean;
  autoplayVideos: boolean;
  currency: string;
  distanceUnit: "km" | "mi";
  language: string;
}

interface SettingsState {
  notifications: NotificationSettings;
  appSettings: AppSettings;
  setNotification: (key: keyof NotificationSettings, value: boolean) => void;
  setAppSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetNotifications: () => void;
  resetAppSettings: () => void;
}

const defaultNotifications: NotificationSettings = {
  pushNotifications: true,
  emailNotifications: true,
  propertyAlerts: true,
  priceDropAlerts: true,
  newListingAlerts: false,
  messageNotifications: true,
  marketingEmails: false,
};

const defaultAppSettings: AppSettings = {
  darkMode: false,
  hapticFeedback: true,
  locationServices: true,
  autoplayVideos: true,
  currency: "USD",
  distanceUnit: "km",
  language: "English",
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: { ...defaultNotifications },
      appSettings: { ...defaultAppSettings },

      setNotification: (key, value) =>
        set((state) => ({
          notifications: { ...state.notifications, [key]: value },
        })),

      setAppSetting: (key, value) =>
        set((state) => ({
          appSettings: { ...state.appSettings, [key]: value },
        })),

      resetNotifications: () =>
        set({ notifications: { ...defaultNotifications } }),

      resetAppSettings: () =>
        set({ appSettings: { ...defaultAppSettings } }),
    }),
    {
      name: "homehive-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
