'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [home, setHome] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/home').then((res) => res.json()),
      fetch('http://localhost:3001/api/skills').then((res) => res.json()),
      fetch('http://localhost:3001/api/works').then((res) => res.json()),
    ]).then(([homeData, skillData, workData]) => {
      setHome(homeData);
      setSkills(skillData);
      setWorks(workData);
    });
  }, []);

  if (!home) return <p className="text-center mt-40 text-lg">Loading...</p>;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-16 flex flex-col items-center">
      {/* 🌟 Profile */}
      <section className="flex flex-col items-center text-center gap-4">
        <Image
          src="/profile.jpg"
          alt="profile"
          width={140}
          height={140}
          className="rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold">{home.title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {home.subtitle}
        </p>

        <Link
          href="/contact"
          className="bg-black text-white px-6 py-3 rounded mt-6 hover:bg-gray-800 transition"
        >
          📩 お問い合わせはこちら
        </Link>
      </section>

      {/* 🧠 Skills Section（← DB 化完了🔥） */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-2 bg-white dark:bg-zinc-800 rounded shadow-sm text-sm text-center"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* 📁 Works Section（DB反映OK・デザイン統一版） */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Works
        </h2>

        <div className="grid gap-3">
          {works.map((work) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              className="p-4 rounded-lg bg-white dark:bg-zinc-800 shadow-sm
        hover:shadow-md hover:-translate-y-[2px] transition transform block"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                ✏️ {work.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 break-all mt-1">
                {work.url}
              </p>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-20">
        <Link href="/admin/login" className="text-sm opacity-70 underline">
          🔐 管理者ログインはこちら
        </Link>
      </div>
    </main>
  );
}
