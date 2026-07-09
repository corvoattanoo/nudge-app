import { FastifyInstance } from "fastify";
import { register, login } from '../controllers/auth.controller'
import { authenticate } from "../middlewares/authenticate";
import { request } from "http";

export async function authRoutes(fastify: FastifyInstance){
  fastify.post('/register', register)
  fastify.post('/login', login)

  fastify.get('/me', {preHandler: authenticate},async (request, reply) => {return reply.send(request.user)})
}