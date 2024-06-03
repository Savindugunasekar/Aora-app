import { Client, Account, ID, Avatars, Databases, Query ,Storage} from "react-native-appwrite";

// Appwrite Configuration
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.slg.aora",
  projectId: "665b3a8600395d48b8f4",
  databaseId: "665b3c93001549ad1f75",
  userCollectionId: "665b3cc00034333829b4",
  videoCollectionId:'665b3cf2001b2458515a',
  storageId:'665b3ec2001819cb8058'
  
 
};

// Init your React Native SDK
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    console.log(newAccount);

    if (!newAccount) {
      throw new Error('Failed to create account');
    }

    const avatarUrl = avatars.getInitials(username);

    

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl.href // Ensure correct URL property
      }
    );
    await account.createEmailPasswordSession(email, password);

    console.log(newUser);
    return

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export async function signInUser(email, password) {
  try {
    // Check if there is already an active session
    const currentSession = await account.getSession("current");

    
    
    // If a session already exists, return null
    if (currentSession) {
      return null;
    }

    // If no session exists, create a new one
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async()=>{
    try{

        const currentAccount= await account.get()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("accountId", currentAccount.$id)]


        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(error){
        console.log(error);
        return null;
    }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt')]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title',query)]

    );

    if(!posts) throw new Error ("Something went wrong")

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
     [Query.equal('creator',userId),Query.orderDesc('$createdAt')]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}



export const getFilePreview = async (fileId,type)=>{

  let fileUrl;

  try{

    if(type==='video'){

      fileUrl = storage.getFileView(appwriteConfig.storageId,fileId)
      console.log('videourl'+fileUrl);

    }else if(type==='image'){
      fileUrl=storage.getFilePreview(appwriteConfig.storageId,fileId,2000,2000,'top',100)
      console.log('imageurl'+fileUrl);

    }else{
      throw new Error('Invalid file type')
    }

    if (!fileUrl) throw Error

    return fileUrl



  }catch(error){
    throw new Error
  }

}






export const uploadFile = async (file,type)=>{

if(!file) return


const asset = {
  name :file.fileName,
  type:file.mimeType,
  size:file.fileSize,
  uri:file.uri
}

console.log(asset);
try{

  const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    asset
  );

  const fileUrl = await getFilePreview(uploadedFile.$id,type)

  console.log(fileUrl);

  return fileUrl





}catch(error){
  throw new Error
}

}



export const createVideoPost = async(form)=>{
  try{

    const [thumbnailUrl,videoUrl]= await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ])

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;


  }catch(error){
    throw new Error
    console.log('error is'+error);
  }
}