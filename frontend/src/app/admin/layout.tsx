'use client';

import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { notFound, usePathname } from 'next/navigation'; // ← usePathname を追加！

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const pathname = usePathname(); // ★ 現在のパス取得

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(Boolean(user));
    });
    return () => unsubscribe();
  }, []);

  // ★ /admin/login は認証なしで表示OK
  if (pathname === '/admin/login') return <>{children}</>;

  if (isAuth === null) return <p>Loading...</p>; // ←ロード中
  if (!isAuth) return notFound(); // ←未ログインなら404
  return <>{children}</>;
}
