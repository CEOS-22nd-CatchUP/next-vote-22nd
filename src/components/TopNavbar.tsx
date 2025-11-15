import Link from 'next/link';

const TopNavbar = () => {
  return (
    <div className="flex w-full justify-center pt-[1vh]">
      <div className="flex h-8 w-[90vw] items-center justify-between border-2 p-2">
        <Link href="/">2025 CEOS AWARD</Link>
        <div className="flex gap-5">
          <Link href="/vote" className="cursor-pointer">
            VOTING
          </Link>
          <Link href="/member" className="cursor-pointer">
            MEMBERS
          </Link>
          <Link href="/login" className="cursor-pointer">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
