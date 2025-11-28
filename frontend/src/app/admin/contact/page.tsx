'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  // 🔐 未ログイン → /admin/login へリダイレクト
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) window.location.href = '/admin/login';
    });
  }, []);

  // 📩 問い合わせ一覧取得
  useEffect(() => {
    fetch('http://localhost:3001/contact')
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/admin/login';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 🔥 ヘッダー — 戻るボタン + ログアウト */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📩 問い合わせ一覧
        </h1>

        <div className="flex gap-3">
          {/* 🔙 管理画面へ戻る（ボタン風） */}
          <button
            onClick={() => (window.location.href = '/admin')}
            className="px-4 py-2 rounded-lg font-bold
             bg-gray-200 hover:bg-gray-300 text-gray-700
             transition shadow-sm"
          >
            ◀ 管理画面へ戻る
          </button>

          {/* 🚪 ログアウトボタン（強調） */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-bold text-white
             bg-blue-500 hover:bg-blue-600 active:scale-95
             transition-all shadow-md"
          >
            🚪 ログアウト
          </button>
        </div>
      </div>

      {/* 🗂 問い合わせ一覧 */}
      <ul className="space-y-4">
        {contacts.map((c) => (
          <li
            key={c.id}
            className="border p-4 rounded bg-white shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">
                {c.name} <span className="text-gray-500">({c.email})</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">{c.message}</p>
            </div>

            <div className="flex gap-3">
              {/* ✏ 編集 */}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={async () => {
                  const newMessage = prompt('編集内容', c.message);
                  if (!newMessage) return;

                  await fetch(`http://localhost:3001/contact/${c.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: newMessage }),
                  });

                  setContacts(
                    contacts.map((x) =>
                      x.id === c.id ? { ...x, message: newMessage } : x
                    )
                  );
                }}
              >
                編集
              </button>

              {/* 🗑 削除 */}
              <button
                className="text-red-600 font-medium hover:underline"
                onClick={async () => {
                  await fetch(`http://localhost:3001/contact/${c.id}`, {
                    method: 'DELETE',
                  });

                  setContacts(contacts.filter((x) => x.id !== c.id));
                }}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
