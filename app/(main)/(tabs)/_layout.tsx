import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { Tabs, useRouter } from "expo-router";

function Layout() {
  const router = useRouter()
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: ""
        }}
      />
      <Tabs.Screen 
        name="search" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          tabBarLabel: ""
        }}
      />
      <Tabs.Screen 
        name="create" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: ""
        }}
        listeners={{
          tabPress :(e)=>{
            e.preventDefault();
            Haptics.selectionAsync();
            router.push('/(modals)/create')
          }
        }}
      />
      <Tabs.Screen 
        name="favourites" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          tabBarLabel: ""
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: ""
        }}
      />
    </Tabs>
  )
}

export default Layout;
