export interface VoteStatus {
  teamVote: boolean;
  partLeadVote: boolean;
}

export interface TeamVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}

export interface PartVoteResult {
  targetId: number;
  targetName: string;
  voteCount: number;
}

export interface VoteResults {
  teamVoteResults: TeamVoteResult[];
  partLeadVoteResults: PartVoteResult[];
}
