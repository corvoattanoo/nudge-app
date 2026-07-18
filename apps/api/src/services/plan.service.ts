import prisma from "../lib/prisma";

export class PlanServiceError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "PlanServiceError";
  }
}

// A plan can only be viewed by a member of the group that owns it.
export async function getPlanForMember(eventShareId: number, userId: number) {
  const plan = await prisma.plan.findUnique({
    where: { event_share_id: eventShareId },
    include: {
      event: true,
      eventShare: true,
      group: { select: { id: true, groupName: true } },
    },
  });

  if (!plan) {
    throw new PlanServiceError(404, "No plan exists for this event share");
  }

  const membership = await prisma.groupMembers.findFirst({
    where: { group_id: plan.group_id, user_id: userId },
    select: { id: true },
  });

  if (!membership) {
    throw new PlanServiceError(403, "You are not a member of this group");
  }

  return plan;
}
