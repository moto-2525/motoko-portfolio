'use client';

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  // 🔥 未ログインなら /admin/login にリダイレクト
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        document.cookie =
          'firebaseAuthToken=; Path=/; Max-Age=0; Secure; SameSite=Lax;';
        window.location.href = '/admin/login';
      }
    });
    return () => unSub();
  }, []);

  // 🔥 ログアウト
  const handleLogout = async () => {
    await signOut(auth);
    document.cookie =
      'firebaseAuthToken=; Path=/; Max-Age=0; Secure; SameSite=Lax;';
    window.location.href = '/admin/login';
  };

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 py-20 bg-gray-50">
      {/* タイトル */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">🧑‍💻 管理画面へようこそ</h1>
        <p className="text-gray-500 mt-1">ログイン成功です✨</p>
      </div>

      {/* 管理メニュー */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <Link
          href="/admin/contact"
          className="block p-5 rounded-xl border bg-white shadow hover:shadow-md hover:-translate-y-1
                     transition flex flex-col items-center text-center font-semibold"
        >
          📩 お問い合わせ管理
          <span className="text-sm text-gray-500 mt-1">Contact Messages</span>
        </Link>

        <Link
          href="/admin/skills"
          className="block p-5 rounded-xl border bg-white shadow hover:shadow-md hover:-translate-y-1
                     transition flex flex-col items-center text-center font-semibold"
        >
          🛠 Skills管理
          <span className="text-sm text-gray-500 mt-1">技術一覧の編集</span>
        </Link>

        <Link
          href="/admin/works"
          className="block p-5 rounded-xl border bg-white shadow hover:shadow-md hover:-translate-y-1
                     transition flex flex-col items-center text-center font-semibold"
        >
          📁 Works管理
          <span className="text-sm text-gray-500 mt-1">制作物の追加/削除</span>
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold shadow
                   hover:bg-blue-600 active:scale-95 transition"
      >
        🚪 ログアウト
      </button>
    </main>
  );
}
