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
import { Mail, ArrowLeft } from "lucide-react-native";
import { useState } from "react";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

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

            {/* Back Button */}

            <Pressable
              onPress={() => router.back()}
              className="absolute top-2 left-7 h-11 w-11 rounded-full bg-white items-center justify-center shadow-sm"
            >
              <ArrowLeft size={20} color="#334155" />
            </Pressable>

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

              <Text className="mt-6 text-4xl font-extrabold text-slate-900 text-center">
                {emailSent ? "Check Your Email" : "Forgot Password?"}
              </Text>

              <Text className="mt-2 text-center text-slate-500 text-base px-4">
                {emailSent
                  ? "We've sent a password reset link to your email address."
                  : "Enter your email and we'll send you a link to reset your password."}
              </Text>

            </View>

            {!emailSent ? (
              <>
                {/* Email */}

                <View className="mt-12">

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

                {/* Button */}

                <Pressable
                  className="mt-10 overflow-hidden rounded-full"
                  onPress={() => setEmailSent(true)}
                >
                  <LinearGradient
                    colors={["#2563EB", "#1D4ED8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >

                    <View className="h-16 items-center justify-center">

                      <Text className="text-lg font-bold text-white">
                        Send Reset Link
                      </Text>

                    </View>

                  </LinearGradient>
                </Pressable>
              </>
            ) : (
              <>
                {/* Resend Button */}

                <Pressable
                  className="mt-10 overflow-hidden rounded-full"
                  onPress={() => setEmailSent(true)}
                >
                  <LinearGradient
                    colors={["#2563EB", "#1D4ED8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >

                    <View className="h-16 items-center justify-center">

                      <Text className="text-lg font-bold text-white">
                        Resend Email
                      </Text>

                    </View>

                  </LinearGradient>
                </Pressable>
              </>
            )}

            {/* Bottom */}

            <View className="items-center mt-10">
              <Text className="text-slate-500">
                Remember your password?
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