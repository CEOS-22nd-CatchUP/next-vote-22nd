'use client';

import { useState } from 'react';
import Alert from '@/components/vote/Alert';

const VoteSelector = ({ candidates, part }: { candidates: string[]; part: string }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSelect = (name: string) => {
    if (selected && selected !== name) {
      // 이미 선택되어 있는 경우
      setAlertOpen(true);
      return;
    }
    setSelected(name);
  };

  const handleCancelVote = () => {
    setSelected(null); // 선택 삭제
    setAlertOpen(false); // 모달 닫기
  };

  const handleCloseAlert = () => {
    setAlertOpen(false); // 선택 유지, 모달 닫기
  };

  return (
    <div className={`mx-auto mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {candidates.map((name) => {
        const isSelected = selected === name;

        return (
          <div
            key={name}
            onClick={() => handleSelect(name)}
            className={`border-foreground flex cursor-pointer items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium ${isSelected ? 'bg-yellow-400' : ''}`}
          >
            {name}
          </div>
        );
      })}

      {alertOpen && <Alert onCancelVote={handleCancelVote} onClose={handleCloseAlert} />}
    </div>
  );
};

export default VoteSelector;
