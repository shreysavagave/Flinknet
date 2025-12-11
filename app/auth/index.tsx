// This file must be located at app/auth/index.tsx
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Image, Text, TouchableOpacity, View } from "react-native";
import "../globals.css"; // Adjust path if necessary

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = Linking.createURL("dashboard", {
        scheme: "myapp",
      });

      const { createdSessionId, setActive } =
        await startOAuthFlow({
          redirectUrl,
        });

      if (createdSessionId) {
        // SUCCESS: This call tells Clerk the user is logged in, 
        // triggering the navigation logic in app/_layout.tsx.
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("Google OAuth Error:", err);
    }
  };

  return (
    <View className="flex-1 justify-between items-center py-20 bg-white">

      <View className="items-center mt-10">
        <Image
          source={require("../../assets/images/logo.jpg")}
          className="w-28 h-24 mt-5"
        />
        <Text className="text-black text-lg mt-5">Welcome to</Text>
        <Text className="text-black text-6xl font-bold">Flinknet</Text>
      </View>

      <TouchableOpacity
        className="bg-white px-14 py-3 rounded-xl flex-row items-center border-gray-300 border mb-10 shadow-md"
        onPress={handleGoogleLogin}
      >
        <Image
          source={require("../../assets/images/google-logo-9808 1.png")}
          className="w-8 h-8 mr-2"
        />
        <Text className="text-black font-semibold text-lg">
          Continue with Google
        </Text>
      </TouchableOpacity>

    </View>
  );
}