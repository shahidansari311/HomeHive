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
import { Mail, ArrowLeft, KeyRound, Plane } from "lucide-react-native";
import { useState } from "react";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

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

          <View className="items-center justify-center" style={{ height: 220 }}>
            <View className="absolute top-8 right-12 opacity-40">
              <Plane size={26} color="#1D4ED8" />
            </View>
            <View className="absolute top-20 left-10 h-2 w-2 rounded-full bg-white/70" />

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
              {emailSent ? (
                "Check Your Email"
              ) : (
                <>
                  Forgot Password?{"\n"}
                  <Text className="text-blue-600">Reset It Here</Text>
                </>
              )}
            </Text>

            <Text className="mt-3 text-center text-slate-500 text-sm px-2">
              {emailSent
                ? "We've sent a password reset link to your email address."
                : "Enter your email and we'll send you a link to reset your password."}
            </Text>

            {!emailSent ? (
              <>
                {/* Email */}
                <View className="mt-10">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <Mail size={18} color="#94A3B8" />
                    <TextInput
                      placeholder="Enter your email"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="flex-1 ml-3 text-base text-slate-900"
                    />
                  </View>
                </View>

                {/* Button */}
                <Pressable
                  className="mt-8 overflow-hidden rounded-full bg-slate-900"
                  onPress={() => setEmailSent(true)}
                >
                  <View className="h-14 items-center justify-center">
                    <Text className="text-base font-bold text-white">
                      Submit
                    </Text>
                  </View>
                </Pressable>
              </>
            ) : (
              <Pressable
                className="mt-8 overflow-hidden rounded-full bg-slate-900"
                onPress={() => setEmailSent(true)}
              >
                <View className="h-14 items-center justify-center">
                  <Text className="text-base font-bold text-white">
                    Resend Email
                  </Text>
                </View>
              </Pressable>
            )}

            {/* Bottom */}
            <View className="flex-row items-center justify-center mt-10">
              <Text className="text-slate-500">Remember your password? </Text>
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