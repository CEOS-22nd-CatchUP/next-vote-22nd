interface VoteStatus {
  teamVote: boolean;
  partLeadVote: boolean;
}

interface PartVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}

interface TeamVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}
