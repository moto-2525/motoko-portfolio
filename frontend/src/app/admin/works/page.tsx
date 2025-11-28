'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WorksAdmin() {
  const [works, setWorks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const fetchWorks = async () => {
    const res = await fetch('http://localhost:3001/api/works');
    setWorks(await res.json());
  };

  // 📌 fetchWorksを依存から除外する（意図的）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchWorks();
  }, []);

  const addWork = async () => {
    if (!title || !url) return;
    await fetch('http://localhost:3001/api/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url }),
    });
    setTitle('');
    setUrl('');
    fetchWorks();
  };

  const deleteWork = async (id: number) => {
    await fetch(`http://localhost:3001/api/works/${id}`, { method: 'DELETE' });
    fetchWorks();
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      {/* 🔙 トップ戻るボタン */}
      <Link
        href="/admin"
        className="inline-block mb-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-100"
      >
        ← 管理トップへ戻る
      </Link>

      <h1 className="text-2xl font-bold mb-6">📄 Works 管理</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="作品タイトル"
        className="border rounded p-2 w-full mb-3"
      />

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="GitHub / WebサイトURL"
        className="border rounded p-2 w-full mb-3"
      />

      <button
        onClick={addWork}
        className="bg-black text-white w-full py-3 rounded mb-6 hover:bg-gray-800"
      >
        ＋ 追加する
      </button>

      <ul className="space-y-3">
        {works.map((work) => (
          <li key={work.id} className="border p-3 rounded flex justify-between">
            <div>
              <p className="font-semibold">{work.title}</p>
              <a
                href={work.url}
                target="_blank"
                className="text-blue-600 underline"
              >
                {work.url}
              </a>
            </div>
            <button
              onClick={() => deleteWork(work.id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑 削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
