import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import { eventDetails, eventDisplay, shareEvent } from "../controllers/event.controller";

export async function eventsRoutes(fastify: FastifyInstance) {
    //fastify.addHook('onRequest', authenticate)
    fastify.get('/', eventDisplay)
    fastify.get('/:id', eventDetails)
    fastify.post('/share', {preHandler: authenticate}, shareEvent)
}