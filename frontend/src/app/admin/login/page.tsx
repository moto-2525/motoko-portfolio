'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // ← ★ これが必要！

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ←🔥 関数名を handleLoginに統一
  const handleLogin = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();

    document.cookie = `firebaseAuthToken=${token}; path=/;`;
    window.location.href = '/admin';
  };

  return (
    <div className="text-center mt-24">
      <h2 className="text-xl font-bold mb-8">管理者ログイン</h2>

      <div className="flex flex-col items-center gap-3">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* グレーボタン */}
        <button
          onClick={handleLogin}
          className="px-6 py-2 mt-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold transition shadow-sm"
        >
          ログイン
        </button>
      </div>

      {/* ⬅ Topへ */}
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 px-6 py-2 rounded-lg border border-gray-400
                   text-gray-700 hover:bg-gray-100 transition shadow-sm"
      >
        ⬅ Topページに戻る
      </button>
    </div>
  );
}
