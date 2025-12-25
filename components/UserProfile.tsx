// UserProfile.tsx
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

const UserProfile = ({ userId }: { userId?: Id<"users"> }) => {
  const profile = useQuery(api.users.getUserById, userId ? { userId } : "skip");

  if (profile === undefined) return <ActivityIndicator className="mt-10" />;
  if (profile === null) return <Text className="p-5 text-center">User not found</Text>;

  return (
    <View className="bg-white">
      {/* Top Username Bar (Fetched from Convex) */}
      <View className="px-4 py-2 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-xl font-bold tracking-tight">
            {profile.username || "username"}
          </Text>
          <Ionicons name="chevron-down" size={14} color="black" className="ml-1" />
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Stats Section */}
      <View className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="relative">
            <Image 
              source={{ uri: profile.imageUrl || 'https://via.placeholder.com/150' }} 
              className="h-20 w-20 rounded-full border border-gray-200" 
            />
            <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full border-2 border-white p-0.5">
              <Ionicons name="add" size={12} color="white" />
            </View>
          </View>
          
          <View className="flex-1 flex-row justify-around ml-5">
            <StatItem label="Posts" count={0} />
            <StatItem label="Followers" count={profile.followerCount || 0} />
            <StatItem label="Following" count={profile.followingCount || 0} />
          </View>
        </View>

        {/* Bio Section */}
        <View className="mt-3">
          <Text className="font-bold text-[14px]">
            {profile.first_name} {profile.last_name}
          </Text>
          <Text className="text-[14px] text-gray-800 leading-5" numberOfLines={3}>
            {profile.bio || "Tap Edit Profile to add a bio."}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row mt-4 space-x-2">
          <TouchableOpacity className="flex-1 bg-gray-100 rounded-lg py-2 items-center">
            <Text className="font-semibold text-sm text-black">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-100 rounded-lg py-2 items-center">
            <Text className="font-semibold text-sm text-black">Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const StatItem = ({ label, count }: { label: string; count: number }) => (
  <View className="items-center">
    <Text className="font-bold text-[17px]">{count}</Text>
    <Text className="text-[12px] text-gray-600">{label}</Text>
  </View>
);

export default UserProfile;