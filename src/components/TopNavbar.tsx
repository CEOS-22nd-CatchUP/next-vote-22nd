'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'src/store/useAuthStore';

const TopNavbar = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-12" />;

  return (
    <div className="flex w-full justify-center pt-[1.5vh]">
      <div className="flex h-12 w-[90vw] items-center justify-between gap-5 border-2 px-4 py-2">
        <Link href="/" className="font-bold">
          <span className="sm:hidden">CEOS</span>
          <span className="hidden sm:inline">2025 CEOS AWARD</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/vote" className="hover:underline">
            VOTING
          </Link>

          {isLoggedIn && user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border-x px-4 py-1 text-xs">
                <span className="bg-foreground text-background px-1.5 py-0.5 font-bold uppercase">{user.part}</span>
                <span className="font-semibold">{user.team}</span>
                <span className="text-gray-500">{user.name}님</span>
              </div>

              <button onClick={() => logout()} className="text-gray-400 hover:text-black">
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">LOGIN</Link>
              <Link href="/signup">SIGNUP</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
