import { FastifyInstance } from "fastify";
import { getPlan } from "../controllers/plan.controller";
import { authenticate } from "../middlewares/authenticate";

export async function planRoutes(fastify: FastifyInstance) {
  fastify.get("/event-shares/:eventShareId", { preHandler: authenticate }, getPlan);
}
