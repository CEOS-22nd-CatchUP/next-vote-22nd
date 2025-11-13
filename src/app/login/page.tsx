import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-[550px] flex-col items-center justify-center">
        <div className="mb-9 w-[550px] border-b-2 pb-5">LOGIN</div>
        <div>
          <form>
            <div className="mb-4">
              <input className="border-foreground h-12 w-[550px] border-2 p-3" placeholder="아이디를 입력해 주세요" />
            </div>
            <div className="mb-[34px]">
              <input
                type="password"
                className="border-foreground h-12 w-[550px] border-2 p-3"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <button className="bg-foreground text-background h-16 w-[550px]">로그인하기</button>
          </form>
        </div>
        <div className="mt-5.5">
          <Link href="/signup" className="text-gray-1 underline underline-offset-4">
            아직 계정이 없나요? 회원가입하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
