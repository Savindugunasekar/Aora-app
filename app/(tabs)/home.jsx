import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import VideoCard from '../../components/VideoCard'
import Trending from '../../components/Trending' 
import EmptyState from '../../components/EmptyState' 
import { getAllPosts,getLatestPosts } from "@/lib/appwrite";
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {

  const {user} = useGlobalContext()

  const {data:posts,refetch:refetchPosts} =useAppwrite(getAllPosts)
  const {data:latestPosts,refetch:refetchTrending} =useAppwrite(getLatestPosts)



  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async()=>{
    setRefreshing(true)
    //recall any new videos

    await Promise.all([refetchPosts(), refetchTrending()]);


    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-[#220742]">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => 
          <VideoCard videoItem={item}/>
        }
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                source={images.logo}
                className="w-10 h-10"
                resizeMode="contain"/>
              </View>
            </View>

            <SearchInput/>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 mb-3 text-lg font-pregular">Trending Videos</Text>

              <Trending
              posts={latestPosts}/>



            </View>


            
          </View>
        )}


        ListEmptyComponent={()=>(
         <EmptyState title='No videos found' subtitle='No videos craeted yet'/>
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;
