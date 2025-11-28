'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('http://localhost:3001/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    alert('送信しました！');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-8">🌸 お問い合わせ 🌸</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        {/* ← 横幅を 360pxに拡張 */}
        <input
          className="border p-2 w-80 rounded"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-80 rounded"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ← 入力欄を縦に広く h-40に変更 */}
        <textarea
          className="border p-2 w-80 h-60 rounded"
          placeholder="お問い合わせ内容"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 送信ボタン - 柔らかグレー */}
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400
                     font-semibold transition shadow-sm active:scale-95 mt-2"
        >
          送信
        </button>
      </form>

      {/* Topへ戻るボタン */}
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 px-6 py-2 rounded-lg border border-gray-400 text-gray-700
                   hover:bg-gray-200 transition shadow-sm active:scale-95"
      >
        ⬅ Topページに戻る
      </button>
    </div>
  );
}
