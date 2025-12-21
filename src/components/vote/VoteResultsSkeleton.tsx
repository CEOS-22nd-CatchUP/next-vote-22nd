interface VoteResultsSkeletonProps {
  part: string;
}

export default function VoteResultsSkeleton({ part }: VoteResultsSkeletonProps) {
  return (
    <div className={`mb-5 grid w-[80dvw] gap-4 xl:w-250 ${part === 'demo' ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {Array.from({ length: part === 'demo' ? 5 : 6 }).map((_, index) => (
        <div
          key={index}
          className="flex h-15 animate-pulse items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-200 p-4"
        ></div>
      ))}
    </div>
  );
}
