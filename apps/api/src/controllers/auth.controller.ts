import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'

declare module '@fastify/jwt'{
  interface FastifyJWT{
    payload: {id: number, email: string, username: string}
    user: { id: number; email: string; username: string }
  }
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, username, password } = request.body as {
    email: string
    username: string
    password: string
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, username, password_hash: passwordHash }
  })

  return reply.status(201).send({
    id: user.id,
    email: user.email,
    username: user.username
  })

}
export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as {
    email: string
    password: string
  }

  //find user
  const user = await prisma.user.findUnique({
    where: { email }
  })
  // if no user found 
  if (!user) {
    return reply.status(404).send({ message: 'User not found' })
  }
  //check the password
  const isValid = await bcrypt.compare(password, user.password_hash)

  if(!isValid){
    return reply.status(401).send({message: 'Invalid password'})
  }

  //generate token
  const token = request.server.jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  })

  return reply.status(200).send({token})
}
