import PartVoteResultClient from './components/PartVoteResultClient';

interface PageProps {
  params: Promise<{ part: string }>;
}

export default async function PartVoteResultPage({ params }: PageProps) {
  const resolvedParams = await params; // Promise 해제
  const { part } = resolvedParams;

  return <PartVoteResultClient part={part} />;
}
