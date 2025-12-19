// Server Component (투표 페이지)

import PartVoteClient from './components/PartVoteClient';

export default async function PartVotePage({ params }: { params: Promise<{ part: string }> }) {
  const { part } = await params;

  return <PartVoteClient part={part} />;
}
