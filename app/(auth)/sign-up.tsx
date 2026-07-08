import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react-native";
import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#EDF6FF]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View className="flex-1 px-7 pb-10 justify-center">

            {/* Header */}

            <View className="items-center mt-8">

              <View className="h-20 w-28 items-center justify-center">
                <Image
                  source={require("../../assets/logos/icon.png")}
                  style={{
                    width: 140,
                    height: 110,
                  }}
                  resizeMode="cover"
                />
              </View>

              <Text className="mt-6 text-4xl font-extrabold text-slate-900">
                Create Account
              </Text>

              <Text className="mt-2 text-center text-slate-500 text-base">
                Sign up to start exploring your dream home.
              </Text>

            </View>

            {/* Full Name */}

            <View className="mt-12">

              <Text className="mb-2 ml-2 font-semibold text-slate-700">
                Full Name
              </Text>

              <View className="flex-row items-center rounded-full border border-slate-200 bg-white px-5 h-16">

                <User
                  size={20}
                  color="#64748B"
                />

                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  className="flex-1 ml-3 text-base text-slate-900"
                />

              </View>

            </View>

            {/* Email */}

            <View className="mt-6">

              <Text className="mb-2 ml-2 font-semibold text-slate-700">
                Email
              </Text>

              <View className="flex-row items-center rounded-full border border-slate-200 bg-white px-5 h-16">

                <Mail
                  size={20}
                  color="#64748B"
                />

                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-base text-slate-900"
                />

              </View>

            </View>

            {/* Password */}

            <View className="mt-6">

              <Text className="mb-2 ml-2 font-semibold text-slate-700">
                Password
              </Text>

              <View className="flex-row items-center rounded-full border border-slate-200 bg-white px-5 h-16">

                <Lock
                  size={20}
                  color="#64748B"
                />

                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-base text-slate-900"
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      color="#64748B"
                    />
                  ) : (
                    <Eye
                      size={20}
                      color="#64748B"
                    />
                  )}
                </Pressable>

              </View>

            </View>

            {/* Confirm Password */}

            <View className="mt-6">

              <Text className="mb-2 ml-2 font-semibold text-slate-700">
                Confirm Password
              </Text>

              <View className="flex-row items-center rounded-full border border-slate-200 bg-white px-5 h-16">

                <Lock
                  size={20}
                  color="#64748B"
                />

                <TextInput
                  placeholder="Re-enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 ml-3 text-base text-slate-900"
                />

                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={20}
                      color="#64748B"
                    />
                  ) : (
                    <Eye
                      size={20}
                      color="#64748B"
                    />
                  )}
                </Pressable>

              </View>

            </View>

            {/* Button */}

            <Pressable
              className="mt-10 overflow-hidden rounded-full"
            >
              <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >

                <View className="h-16 items-center justify-center">

                  <Text className="text-lg font-bold text-white">
                    Sign Up
                  </Text>

                </View>

              </LinearGradient>
            </Pressable>

            {/* Bottom */}

            <View className="items-center mt-10">
              <Text className="text-slate-500">
                Already have an account?
              </Text>

              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text className="mt-2 text-xs font-bold text-blue-600">
                    Sign In
                  </Text>
                </Pressable>
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}