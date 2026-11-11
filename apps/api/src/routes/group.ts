import { FastifyInstance } from 'fastify'
import { createGroup, groupList, inviteToGroup } from '../controllers/group.controller'
import { authenticate } from '../middlewares/authenticate'

export async function groupRoutes(fastify: FastifyInstance) {
    fastify.addHook('onRequest', authenticate) // for every requests adds authentication so below we dont write
    fastify.post('/create', createGroup)
    fastify.post('/invite', inviteToGroup)
    fastify.get('/grouplist', groupList)
}