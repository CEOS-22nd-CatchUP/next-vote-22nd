import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex w-[90dvw] flex-col items-center justify-center md:w-[550px]">
      <div className="mb-9 w-full border-b-2 pb-5">LOGIN</div>
      <div className="w-full">
        <form className="w-full">
          <div className="mb-4">
            <input className="border-foreground h-12 w-full border-2 p-3" placeholder="아이디를 입력해 주세요" />
          </div>
          <div className="mb-[34px]">
            <input
              type="password"
              className="border-foreground h-12 w-full border-2 p-3"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
          <button className="bg-foreground text-background h-16 w-full">로그인하기</button>
        </form>
      </div>
      <div className="mt-5.5">
        <Link href="/signup" className="text-gray-1 underline underline-offset-4">
          아직 계정이 없나요? 회원가입하러 가기
        </Link>
      </div>
    </div>
  );
}
