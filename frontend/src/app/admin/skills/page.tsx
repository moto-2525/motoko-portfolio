'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const fetchSkills = async () => {
    const res = await fetch('http://localhost:3001/api/skills');
    setSkills(await res.json());
  };

  // 📌 fetchWorksを依存から除外する（意図的）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!newSkill) return;
    await fetch('http://localhost:3001/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSkill }),
    });
    setNewSkill('');
    fetchSkills();
  };

  const deleteSkill = async (id: number) => {
    await fetch(`http://localhost:3001/api/skills/${id}`, { method: 'DELETE' });
    fetchSkills();
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      {/* 🔙 管理画面に戻る */}
      <Link
        href="/admin"
        className="inline-block mb-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-100"
      >
        ← 管理トップへ戻る
      </Link>

      <h1 className="text-2xl font-bold mb-6">🛠 Skills 管理</h1>

      <div className="flex gap-4 mb-6">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="新しいSkill名"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addSkill}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          追加
        </button>
      </div>

      <ul className="space-y-2">
        {skills.map((s) => (
          <li key={s.id} className="flex justify-between p-2 border rounded">
            {s.name}
            <button
              onClick={() => deleteSkill(s.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
