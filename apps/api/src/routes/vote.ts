import { FastifyInstance } from 'fastify'
import { authenticate } from '../middlewares/authenticate'
import { voting } from '../controllers/vote.controller'

export async function votingRoutes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', authenticate)
    fastify.post('/', voting)
}