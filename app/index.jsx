import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {

  const {isLoading,isLoggedIn} = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

  return (
    <SafeAreaView className="bg-[#2d0a57] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">

          <View className="flex  flex-row items-center gap-2 mb-20 ">
            <View>
            <Image
            source={images.logo}
            className="w-[60px] h-[60px] "
            resizeMode="contain"
          />
            </View>
            <View>
            <Text className="font-bold text-3xl text-white">SnapShare</Text>
            </View>
          
          

          </View>
          
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Unlock New Horizons With{" "}
              <Text className="text-secondary-200">SnapShare</Text>
            </Text>

            
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            {" "}
            Unleash Your Imagination: Dive into Boundless Creativity and Innovation with SnapShare!
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#2d0a57" style="light" />
    </SafeAreaView>
  );
}
