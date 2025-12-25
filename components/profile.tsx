import { useUserProfile } from "@/hooks/useUserProfile";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProfile from "./UserProfile";

export default function Profile() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator color="black" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pass the ID to the header-enabled UserProfile */}
        <UserProfile userId={userProfile._id} />

        {/* Tab Switcher */}
        <View className="flex-row border-t border-gray-100 mt-6">
          <TouchableOpacity className="flex-1 items-center py-3 border-b border-black">
            <Ionicons name="grid-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-3">
            <Ionicons name="person" size={22} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Placeholder for no posts */}
        <View className="items-center justify-center py-20 px-10">
          <View className="w-20 h-20 rounded-full border border-gray-300 items-center justify-center mb-4">
            <Ionicons name="camera-outline" size={40} color="gray" />
          </View>
          <Text className="text-xl font-bold">No Posts Yet</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}