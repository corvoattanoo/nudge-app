import { FastifyInstance } from "fastify";
import { register } from '../controllers/auth.controller'

export async function authRoutes(fastify: FastifyInstance){
  fastify.post('/register', register)
}