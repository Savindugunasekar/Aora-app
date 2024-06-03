import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  initialQuery
}) => {
 
  const pathname = usePathname()
  const [query,setQuery] = useState(initialQuery||'')

  return (


      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
        <TextInput
          className="flex-1 text-white font-pregular text-base mt-0.5"
          value={query}
          placeholder="Search videos.."
          placeholderTextColor="#cdcde0"
          onChangeText={(e)=>setQuery(e)}
          
         
        />

        <TouchableOpacity
        onPress={()=>{
          if(query===''){
            return Alert.alert('Missing query','Please input something to search across database')
          }
          if(pathname.startsWith('/search'))
            router.setParams({query})

          else{
            router.push(`/search/${query}`)
          }

        }}>
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode="contain"/>
        </TouchableOpacity>

        
      </View>
   
  );
};

export default SearchInput;
