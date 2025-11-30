// frontend/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // ★ 追加（ログインに必要）
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

console.log('API KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ★ これがログインで使われる！
export default app;
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
// 🔥 追加：任意ファイルを格納するルート参照
export const storageRef = ref(storage);
