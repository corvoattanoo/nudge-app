import { FastifyInstance } from 'fastify'
import { createGroup } from '../controllers/group.controller'
import { authenticate } from '../middlewares/authenticate'

export async function groupRoutes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', authenticate)
    fastify.post('/create',{preHandler: authenticate}, createGroup)
}