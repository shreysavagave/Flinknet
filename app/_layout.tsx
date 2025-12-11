import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from '@expo-google-fonts/dm-sans';

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL,{unsavedChangesWarning:false});


const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Effect for handling redirects based on authentication status
  useEffect(() => {
    if (!isLoaded || !fontsLoaded) return;

    const inAuthGroup = segments[0] === 'auth'; 

    if (isSignedIn) {
      if (inAuthGroup) {
        router.replace('/');
      }
    } 
    else if (!isSignedIn) {
      if (!inAuthGroup) {
        router.replace('/auth');
      }
    }
  }, [isSignedIn, isLoaded, fontsLoaded, segments, router]);

  if (!fontsLoaded || !isLoaded) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

  // <Slot /> renders the child route that matches the current URL.
  return <Slot />;
};

// --- RootLayout Component: Sets up Clerk Context ---
export default function RootLayout() {
  if (!clerkPublishableKey) {
     console.error("Clerk Publishable Key is missing!");
     return null; 
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}