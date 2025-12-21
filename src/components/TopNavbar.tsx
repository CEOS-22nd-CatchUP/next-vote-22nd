'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'src/store/useAuthStore';

const TopNavbar = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      router.push('/');
    }
  };

  if (!mounted) return <div className="h-8" />;

  return (
    <div className="flex w-full justify-center pt-[1.5vh]">
      <div className="flex h-8 w-[90vw] items-center justify-between gap-5 border-2 p-2 text-sm">
        <Link href="/">
          <span className="sm:hidden">CEOS</span>
          <span className="hidden sm:inline">2025 CEOS AWARD</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/vote">VOTING</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout}>LOGOUT</button>
          ) : (
            <>
              <Link href="/login">LOGIN</Link>
              <Link href="/signup">SIGNUP</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
