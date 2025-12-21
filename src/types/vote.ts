export interface VoteStatus {
  teamVote: boolean;
  partLeadVote: boolean;
}

export interface PartVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}

export interface TeamVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}
