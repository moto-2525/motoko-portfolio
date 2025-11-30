import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase';

// 画像アップロード → URL返す
export async function uploadImage(file: File) {
  try {
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('📁 Upload Success →', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return null;
  }
}

// 🔥 即時プレビュー更新できるように setCurrentImage を渡せる形に修正 ✨
export async function uploadProfileImage(
  file: File,
  setCurrentImage?: (url: string) => void
) {
  const url = await uploadImage(file);

  if (url) {
    // 画面へ即反映！
    setCurrentImage?.(url);

    // 🔥 バックエンド保存（DB反映）
    await fetch('http://localhost:3001/api/home/update-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: url }),
    });
  }

  return url;
}

// --------------------------------------
// 🗑 Firebase Storage から画像削除する関数
// --------------------------------------
export async function deleteImage(imageUrl: string) {
  try {
    // 画像URLからストレージのパスだけ抽出
    const path = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
    const imageRef = ref(storage, path);

    await deleteObject(imageRef);
    console.log('🗑 画像削除成功:', path);
    return true;
  } catch (err) {
    console.error('❌ 画像削除失敗:', err);
    return false;
  }
}
