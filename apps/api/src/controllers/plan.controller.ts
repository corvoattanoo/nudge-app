import { FastifyReply, FastifyRequest } from "fastify";
import { getPlanForMember, PlanServiceError } from "../services/plan.service";

export async function getPlan(request: FastifyRequest, reply: FastifyReply) {
  const { eventShareId } = request.params as { eventShareId: string };
  const parsedEventShareId = Number(eventShareId);

  if (!Number.isInteger(parsedEventShareId)) {
    return reply.status(400).send({ message: "eventShareId must be an integer" });
  }

  try {
    const plan = await getPlanForMember(parsedEventShareId, request.user.id);
    return reply.status(200).send(plan);
  } catch (error) {
    if (error instanceof PlanServiceError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    throw error;
  }
}
