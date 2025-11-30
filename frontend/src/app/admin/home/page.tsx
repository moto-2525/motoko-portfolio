'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { uploadProfileImage, deleteImage } from '@/lib/uploadImage';

export default function AdminHome() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // 🔥 今のプロフィール画像を取得
  useEffect(() => {
    fetch('http://localhost:3001/api/home')
      .then((res) => res.json())
      .then((data) => setCurrentImage(data?.imageUrl ?? null));
  }, []);

  const handleUpload = async () => {
    if (!file) return alert('画像を選択してください！');
    setUploading(true);

    const url = await uploadProfileImage(file, setCurrentImage);
    if (url) {
      alert('アップロード完了！');
      setCurrentImage(url); // ← 即時反映✨
    }

    setUploading(false);
  };
  const handleDelete = async () => {
    if (!currentImage) return alert('削除する画像がありません');

    const ok = confirm('本当に削除しますか？');
    if (!ok) return;

    // Firebase Storage から削除
    const result = await deleteImage(currentImage);

    if (result) {
      // DBのimageUrl を null に更新
      await fetch('http://localhost:3001/api/home/update-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: null }),
      });

      setCurrentImage(null); // UIも即反映✨
      alert('画像を削除しました');
    }
  };

  return (
    <div className="p-10 space-y-6">
      {/* 🔙 管理画面へ戻る */}
      <button
        onClick={() => (window.location.href = '/admin')}
        className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← 管理画面に戻る
      </button>

      <h2 className="text-xl font-bold">プロフィール画像更新</h2>

      {/* 🔥 現在の画像プレビュー */}
      {currentImage ? (
        <div className="space-y-3">
          <Image
            src={currentImage}
            width={180}
            height={180}
            alt="current profile"
            className="rounded-xl shadow"
          />

          {/* 🔥 削除ボタン */}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            画像を削除
          </button>
        </div>
      ) : (
        <p className="text-gray-500">現在の画像なし</p>
      )}

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? 'アップロード中...' : '画像をアップロード'}
      </button>
    </div>
  );
}
