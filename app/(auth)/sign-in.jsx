import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signInUser,getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {setUser,setIsLoggedIn} = useGlobalContext()

  const [isSubmitting, setisSubmitting] = useState(false)

 

  const Submit = async()=>{

    if(form.email===''||form.password===''){
      Alert.alert('Error','Please fill in all the fields')
    }

    setisSubmitting(true)

    try{

      await signInUser(form.email,form.password);
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)
      

      // set is to global state

      Alert.alert("Success",'User signed in successfully')

      router.replace("/home")

    }catch(error){
      Alert.alert('Error',error.message)
      throw new Error(error)
    }finally{
      setisSubmitting(false)
    }
  }
    
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-psemibold mt-10 ">
            Log into Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            
          />

          <CustomButton 
          title='Sign In'
          handlePress={Submit}
          containerStyles='mt-7'
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">

            <Text className="text-lg text-gray-100 font-pregular">

              Don't have an account?{'  '}

              <Link href={'/sign-up'} className="text-lg font-psemibold text-secondary">

              Sign Up
              
              </Link>

            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
