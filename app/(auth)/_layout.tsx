import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
import { Text, View } from "react-native";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  // Return null while loading to prevent flashes or errors
  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }


  // If already logged in, redirect the user away from the auth pages to the home page (/)
  if (isSignedIn) {
    return <Redirect href="/(main)" />;
  }

  // If not signed in, allow the auth content (Login screen) to show
  return <Slot />;
}