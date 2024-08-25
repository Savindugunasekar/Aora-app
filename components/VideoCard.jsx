import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomModal from "./CustomModal";
import { deleteVideo } from "@/lib/appwrite";

const VideoCard = ({
  videoItem: {
    $id,
    title,
    thumbnail,
    video,
    creator,
  },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    console.log('Cancel Pressed');
    setModalVisible(false);
  };

  const handleDelete = () => {
    deleteVideo($id);
    setModalVisible(false);
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View
            className="w-[46px] h-[46px]
                 rounded-lg border border-secondary-200 flex justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>

          {user && user.$id === creator.$id ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={icons.deleteicon} />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <CustomModal
        visible={modalVisible}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default VideoCard;
