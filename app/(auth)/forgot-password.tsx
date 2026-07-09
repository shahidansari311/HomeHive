import {
  ActivityIndicator,
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
import { Link, router, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, ArrowLeft, KeyRound, Plane ,Lock } from "lucide-react-native";
import { useState } from "react";
import { useSignIn } from "@clerk/expo";

export default function ForgotPassword() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [email,setEmail]=useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const onSendCode = async () => {
    setIsLoading(true);
    const { error: createError } = await signIn.create({ identifier: email });
    if (createError) {
      alert(createError.message);
      setIsLoading(false);
      return;
    }
 
    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    setIsLoading(false);
    if (sendError) {
      alert(sendError.message);
      return;
    }
    setEmailSent(true);
  };
 
  const onResetPassword = async () => {
    setIsLoading(true);
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code,
      password
    });
    setIsLoading(false);
 
    if (error) {
      alert(error.message);
      return;
    }
 
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };
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
                ? "We've sent a code to your email address."
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
                      value={email}
                      onChangeText={setEmail}
                      className="flex-1 ml-3 text-base text-slate-900"
                    />
                  </View>
                </View>

                 {/* Button */}
                {isLoading ? (
                  <ActivityIndicator color="#0F172A" className="mt-8" />
                ) : (
                  <Pressable
                    className="mt-8 overflow-hidden rounded-full bg-slate-900"
                    onPress={onSendCode}
                    disabled={isLoading}
                  >
                    <View className="h-14 items-center justify-center">
                      <Text className="text-base font-bold text-white">
                        Submit
                      </Text>
                    </View>
                  </Pressable>
                )}
              </>
            ) : (
              <>
               {/* Verification Code */}
                <View className="mt-10">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <KeyRound size={18} color="#94A3B8" />
                    <TextInput
                      placeholder="Enter verification code"
                      placeholderTextColor="#94A3B8"
                      keyboardType="number-pad"
                      value={code}
                      onChangeText={setCode}
                      className="flex-1 ml-3 text-base text-slate-900"
                    />
                  </View>
                </View>
 
                {/* New Password */}
                <View className="mt-4">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <Lock size={18} color="#94A3B8" />
                    <TextInput
                      placeholder="Enter new password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      className="flex-1 ml-3 text-base text-slate-900"
                    />
                  </View>
                </View>
 
                <Pressable
                  className="pt-4 px-4"
                  onPress={onSendCode}
                  disabled={isLoading}
                >
                  <Text className="text-blue-600">Send a new code</Text>
                </Pressable>
 
                {/* Button */}
                {isLoading ? (
                  <ActivityIndicator color="#0F172A" className="mt-4" />
                ) : (
                  <Pressable
                    className="mt-4 overflow-hidden rounded-full bg-slate-900"
                    onPress={onResetPassword}
                    disabled={isLoading}
                  >
                    <View className="h-14 items-center justify-center">
                      <Text className="text-base font-bold text-white">
                        Reset Password
                      </Text>
                    </View>
                  </Pressable>
                )}
              </>
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