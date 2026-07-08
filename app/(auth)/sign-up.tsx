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
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Check,
  ArrowLeft,
  MapPin,
} from "lucide-react-native";
import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <View className="flex-1 bg-[#EAF4FF]">
      {/* Illustration header */}
      <LinearGradient
        colors={["#BFE0FF", "#EAF4FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ paddingTop: 60 }}
      >
        <SafeAreaView edges={["top"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-7 h-11 w-11 rounded-full bg-white items-center justify-center shadow-sm z-10"
          >
            <ArrowLeft size={20} color="#334155" />
          </Pressable>

          <View className="items-center justify-center" style={{ height: 190 }}>
            <View className="absolute top-6 left-10 opacity-40">
              <MapPin size={26} color="#1D4ED8" />
            </View>
            <View className="absolute top-20 right-16 h-2 w-2 rounded-full bg-white/70" />

            <View className="h-32 w-32 items-center justify-center ">
              <Image
              source={require("../../assets/logos/icon.png")}
              style={{ width: 150, height: 130, marginTop: 8 }}
              resizeMode="contain"
            />
            </View>

          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        className="flex-1 bg-white rounded-t-[48px] -mt-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-7 pt-8 pb-10">
            {/* Header */}
            <Text className="text-3xl font-extrabold text-slate-900 text-center">
              Sign Up to Explore and{"\n"}
              <Text className="text-blue-600">Find Your Home</Text>
            </Text>

            {/* Full Name */}
            <View className="mt-10">
              <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                <User size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                  className="flex-1 ml-3 text-base text-slate-900"
                />
              </View>
            </View>

            {/* Email */}
            <View className="mt-4">
              <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                <Mail size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Enter your mail"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-base text-slate-900"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mt-4">
              <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-base text-slate-900"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={18} color="#94A3B8" />
                  ) : (
                    <Eye size={18} color="#94A3B8" />
                  )}
                </Pressable>
              </View>
            </View>

            {/* Confirm Password */}
            <View className="mt-4">
              <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 ml-3 text-base text-slate-900"
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} color="#94A3B8" />
                  ) : (
                    <Eye size={18} color="#94A3B8" />
                  )}
                </Pressable>
              </View>
            </View>

            {/* Remember me */}
            <Pressable
              onPress={() => setAgree(!agree)}
              className="flex-row items-center mt-4 px-1"
            >
              <View
                className={`h-5 w-5 rounded-md border items-center justify-center ${
                  agree ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"
                }`}
              >
                {agree && <Check size={13} color="#fff" strokeWidth={3} />}
              </View>
              <Text className="ml-2 text-slate-500 text-sm">Remember me</Text>
            </Pressable>

            {/* Button */}
            <Pressable className="mt-8 overflow-hidden rounded-full bg-slate-900">
              <View className="h-14 items-center justify-center">
                <Text className="text-base font-bold text-white">Sign Up</Text>
              </View>
            </Pressable>

            {/* Bottom */}
            <View className="flex-row items-center justify-center mt-8">
              <Text className="text-slate-500">Already have an account? </Text>
              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text className="font-bold text-slate-900">Login</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}