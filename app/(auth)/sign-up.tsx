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
import { Link, router, useNavigation, useRouter } from "expo-router";
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
import { useAuth, useSignUp } from "@clerk/expo";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const navigate=useNavigation();

  if(signUp.status==="complete" || isSignedIn){
    return null;
  }

  const isLoading = fetchStatus === "fetching";


  const onSignUpPres = async() =>{
    const { error } = await signUp.password({
      emailAddress:email,
      password,
      firstName,
      lastName
    });

    if(error){
      alert(error.message);
      return;
    }
    if(!error) await signUp.verifications.sendEmailCode();
    setPendingVerification(true)
  };

  const onVerifyPres = async() =>{
    await signUp.verifications.verifyEmailCode({
      code
    });

    if(signUp.status==="complete"){
      await signUp.finalize({
        navigate:({decorateUrl})=>{
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
                style={{ width: 150, height: 130 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        className="flex-1 bg-white rounded-t-[48px] -mt-8"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-7 pt-8 pb-10">
            {/* Header */}
            <Text className="text-xl font-extrabold text-slate-900 text-center">
              Sign Up to Explore and{"\n"}
              <Text className="text-blue-600">Find Your Home</Text>
            </Text>

            {!pendingVerification ? (
              <>
                {/* First Name */}
                <View className="mt-10">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <User size={18} color="#94A3B8" />
                    <TextInput
                      placeholder="Enter your first name"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="words"
                      value={firstName}
                      onChangeText={setfirstName}
                      className="flex-1 ml-3 text-base text-slate-900"
                    />
                  </View>
                </View>

                {/* Last Name */}
                <View className="mt-4">
                  <View className="flex-row items-center rounded-full border border-slate-200 bg-slate-50 px-5 h-14">
                    <User size={18} color="#94A3B8" />
                    <TextInput
                      placeholder="Enter your last name"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="words"
                      value={lastName}
                      onChangeText={setlastName}
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
                      value={password}
                      onChangeText={setPassword}
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
                {isLoading ? (
                  <ActivityIndicator color="white"/>
                ) : (
                  <Pressable className="mt-8 overflow-hidden rounded-full bg-slate-900" disabled={isLoading}
                  onPress={onSignUpPres}>
                  <View className="h-14 items-center justify-center">
                    <Text className="text-base font-bold text-white">Sign Up</Text>
                  </View>
                </Pressable>
                )}

              <View nativeID="clerk-captcha"/>
              </>
            ) : (
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
                onPress={()=>signUp.verifications.sendEmailCode()}>
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