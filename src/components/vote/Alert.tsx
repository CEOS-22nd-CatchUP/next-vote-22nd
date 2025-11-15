'use client';

interface AlertProps {
  onCancelVote: () => void;
  onClose: () => void;
}

const Alert = ({ onCancelVote, onClose }: AlertProps) => {
  return (
    <div className="bg-background/80 fixed inset-0 flex items-center justify-center">
      <div className="bg-background border-foreground flex w-[60vw] flex-col justify-between rounded-lg border-2 p-8 font-medium shadow-2xl">
        {/* 프롬프트 */}
        <p className="mb-5 text-center text-lg leading-relaxed whitespace-pre-line">
          한 개의 항목에만 투표하실 수 있습니다.
          <br />
          다시 투표하시겠습니까?
        </p>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button onClick={onCancelVote} className="flex-1 cursor-pointer rounded-lg border-2 py-3">
            예
          </button>
          <button onClick={onClose} className="flex-1 cursor-pointer rounded-lg border-2 py-3">
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
