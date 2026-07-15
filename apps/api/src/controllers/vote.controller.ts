import { FastifyRequest, FastifyReply } from "fastify";
import { castVote, VoteServiceError } from "../services/vote.service";


export async function voting(request: FastifyRequest, reply: FastifyReply) {
const { event_share_id, decision } = request.body as {
      event_share_id: number;
      decision: "YES" | "NO";
    };
    try {
      const result = await castVote({
        eventShareId: event_share_id,
        userId: request.user.id, // use logged-in user, not userId from body
        decision: decision === "YES" ? "APPROVE" : "REJECT",
      });

      return reply.status(201).send(result);
    } catch (error) {
      if (error instanceof VoteServiceError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
}

