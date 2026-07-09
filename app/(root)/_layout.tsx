import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/expo'
import { Redirect, Slot } from 'expo-router';
import { useUserSync } from '@/hooks/useUser';

export default function Rootlayout() {
  const {isSignedIn, isLoaded} = useAuth();


  useUserSync();
  
  if(!isLoaded) return null;

  if(!isSignedIn) return <Redirect href="/sign-in"/>

  return <Slot />
}