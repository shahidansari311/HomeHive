import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router';

export default function Profile() {

  const {signOut} = useAuth();
  const router=useRouter();

  const handleSignOut = async() =>{
    try {
      await signOut();
      router.replace("/sign-in")  
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }
  return (
    <SafeAreaView>

    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={handleSignOut}>SignOut</TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}