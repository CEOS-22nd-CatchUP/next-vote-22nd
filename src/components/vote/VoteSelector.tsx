'use client';

const VoteSelector = ({
  candidates,
  selected,
  onSelect,
  part,
}: {
  candidates: string[];
  selected: string | null;
  onSelect: (name: string) => void;
  part: string;
}) => {
  return (
    <div className={`mx-auto mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {candidates.map((name) => {
        const isSelected = selected === name;

        return (
          <div
            key={name}
            onClick={() => onSelect(name)}
            className={`border-foreground flex cursor-pointer items-center justify-center rounded-lg border-2 p-4 text-center text-lg font-medium ${isSelected ? 'bg-yellow-400' : ''}`}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default VoteSelector;
