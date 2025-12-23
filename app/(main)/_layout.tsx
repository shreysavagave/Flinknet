import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen 
      name="(modals)/create"
       options={{
        presentation : "modal",
        title : "New Post",
        headerRight:()=>(
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-circle" size={24}/>
          </TouchableOpacity>
  )
        }} />
    </Stack>
  )
}

export default Layout;

