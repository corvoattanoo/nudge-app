import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'

export async function register(request: FastifyRequest, reply:FastifyReply){
  const { email, username, password } = request.body as {
    email: string
    username: string
    password: string
  }

  const passwordHash  = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, username, password_hash: passwordHash }
  })

  return reply.status(201).send({
    id: user.id,
    email: user.email,
    username: user.username
  })

}
