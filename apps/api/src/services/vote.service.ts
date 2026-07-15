import prisma from "../lib/prisma";

type VoteDatabase = Pick<typeof prisma, "event_shares" | "groupMembers" | "vote">;

export type VoteDecision = "APPROVE" | "REJECT";

export class VoteServiceError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "VoteServiceError";
  }
}

/**
 * Saves one member's vote, then resolves the shared event once more than half
 * of the group's members have cast the same decision.
 */
export async function castVote({
  eventShareId,
  userId,
  decision,
}: {
  eventShareId: number;
  userId: number;
  decision: VoteDecision;
}) {
  return prisma.$transaction(async (tx) => {
    const eventShare = await tx.event_shares.findUnique({
      where: { id: eventShareId },
      select: { id: true, group_id: true, status: true },
    });

    if (!eventShare) {
      throw new VoteServiceError(404, "Event share not found");
    }

    if (eventShare.status !== "PENDING") {
      throw new VoteServiceError(409, "Voting has already finished");
    }

    // The group comes from eventShare, not the request body. This prevents a
    // user from choosing a different group ID to bypass the membership check.
    const membership = await tx.groupMembers.findFirst({
      where: { group_id: eventShare.group_id, user_id: userId },
      select: { id: true },
    });

    if (!membership) {
      throw new VoteServiceError(403, "You are not a member of this group");
    }

    const existingVote = await tx.vote.findFirst({
      where: { event_share_id: eventShareId, user_id: userId },
      select: { id: true },
    });

    if (existingVote) {
      throw new VoteServiceError(409, "You cannot vote twice");
    }

    const vote = await tx.vote.create({
      data: {
        event_share_id: eventShareId,
        user_id: userId,
        status: decision,
      },
    });

    const result = await checkVoteMajority(eventShareId, eventShare.group_id, tx);

    return { vote, ...result };
  });
}

/** Counts votes and returns the current outcome. A strict majority is > 50%. */
export async function checkVoteMajority(
  eventShareId: number,
  groupId: number,
  tx: VoteDatabase = prisma,
) {
  const [memberCount, approveVotes, rejectVotes] = await Promise.all([
    tx.groupMembers.count({ where: { group_id: groupId } }),
    tx.vote.count({
      where: { event_share_id: eventShareId, status: "APPROVE" },
    }),
    tx.vote.count({
      where: { event_share_id: eventShareId, status: "REJECT" },
    }),
  ]);

  // Examples: 3 members need 2 matching votes; 4 members need 3.
  const votesNeeded = Math.floor(memberCount / 2) + 1;
  const status =
    approveVotes >= votesNeeded
      ? "APPROVED"
      : rejectVotes >= votesNeeded
        ? "REJECTED"
        : "PENDING";

  if (status !== "PENDING") {
    await tx.event_shares.update({
      where: { id: eventShareId },
      data: { status },
    });
  }

  return { memberCount, votesNeeded, approveVotes, rejectVotes, status };
}
