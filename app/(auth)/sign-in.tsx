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
import { Link, useNavigation, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Check,
  Plane,
  Luggage,
  Factory,
} from "lucide-react-native";
import { useState } from "react";
import { useAuth, useSignIn, useSignUp } from "@clerk/expo";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification , setpendingVerification] =useState(false);
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const navigate=useNavigation();

  const isLoading = fetchStatus === "fetching";

  const onSignInPres= async()=>{
    const {error} = await signIn.password({
      emailAddress:email,
      password
    });

    if(error){
      alert(error.message);
      return;
    }

    if(signIn.status==="complete"){
      await signIn.finalize({
        navigate:({session,decorateUrl})=>{
          if(session?.currentTask){
            console.log(session?.currentTask);
            return;
          }
          const url=decorateUrl("/");
          router.replace(url as any);
        }
      })
    }
    else if(signIn.status==="needs_client_trust"){
      const emailCodeFactor=signIn.supportedSecondFactors.find((factor)=>factor.strategy==="email_code");
      if(emailCodeFactor){
        await signIn.mfa.sendEmailCode();
        setpendingVerification(true);
      }
    }
  }

  const onVerifyPres=async()=>{
    await signIn.mfa.verifyEmailCode({code});

    if(signIn.status==="complete"){
      await signIn.finalize({
        navigate:({session,decorateUrl})=>{
          if(session?.currentTask){
            console.log(session?.currentTask);
            return;
          }
          const url=decorateUrl("/");
          router.replace(url as any);
        }
      })
    }
  }

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
          <View className="items-center justify-center" style={{ height: 220 }}>
            <View className="absolute top-6 right-10 opacity-40">
              <Plane size={28} color="#1D4ED8" />
            </View>
            <View className="absolute top-16 left-8 h-3 w-3 rounded-full bg-white/60" />
            <View className="absolute top-24 right-20 h-2 w-2 rounded-full bg-white/70" />

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
              Login to Access Your{"\n"}
              <Text className="text-blue-600">HomeHive Account</Text>
            </Text>

          {!pendingVerification ? (
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

            {/* Password */}
            <View className="mt-4">
              <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                <Lock size={18} color="#94A3B8" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-base text-slate-900"
                  value={password}
                  onChangeText={setPassword}
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

            {/* Remember + Forgot */}
            <View className="flex-row items-center justify-between mt-4 px-1">
              <Pressable
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View
                  className={`h-5 w-5 rounded-md border items-center justify-center ${
                    rememberMe
                      ? "bg-blue-600 border-blue-600"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {rememberMe && <Check size={13} color="#fff" strokeWidth={3} />}
                </View>
                <Text className="ml-2 text-slate-500 text-sm">Remember me</Text>
              </Pressable>

              <Link href="/forgot-password" asChild>
                <Pressable>
                  <Text className="text-sm font-semibold text-slate-500">
                    Forgot password?
                  </Text>
                </Pressable>
              </Link>
            </View>

            {/* Button */}
            <Pressable className="mt-8 overflow-hidden rounded-full bg-slate-900"
            onPress={onSignInPres}
            disabled={isLoading}>
              <View className="h-14 items-center justify-center">
                <Text className="text-base font-bold text-white">Login</Text>
              </View>
            </Pressable>
            </>
          ):(
            <>
                {/* Verification Code */}
                <View className="mt-10">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <Lock size={18} color="#94A3B8" />
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
                <Pressable className="pt-2 px-4"
                onPress={()=>signIn.mfa.sendEmailCode()}>
                  <Text className="text-blue-600">Send a new Code</Text>
                </Pressable>

                <Pressable className="mt-8 overflow-hidden rounded-full bg-slate-900"
                onPress={onVerifyPres}>
                  <View className="h-14 items-center justify-center">
                    <Text className="text-base font-bold text-white">Verify Email</Text>
                  </View>
                </Pressable>
                
              </>
          )}

            {/* Bottom */}
            <View className="flex-row items-center justify-center mt-8">
              <Text className="text-slate-500">Don't have an account? </Text>
              <Link href="/sign-up" asChild>
                <Pressable>
                  <Text className="font-bold text-slate-900">Create an account</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}