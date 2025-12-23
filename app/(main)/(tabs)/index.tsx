// This file must be located at app/index.tsx
import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";
import "../../globals.css";

export default function index() {
  const { signOut, userId } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Signing out will trigger the logic in app/_layout.tsx 
      // which redirects the user back to /auth.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Welcome to the Dashboard!
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30 }}>
        You are successfully logged in as user ID: {userId}
      </Text>
      
      <Button 
        title="Sign Out" 
        onPress={handleSignOut} 
        color="#007AFF"
      />
    </View>
  );
}