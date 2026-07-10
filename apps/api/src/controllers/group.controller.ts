import { FastifyRequest, FastifyReply } from "fastify";
import prisma from '../lib/prisma'


export async function createGroup(request: FastifyRequest, reply: FastifyReply){
    console.log(request.user)
    console.log("USER:", request.user)
console.log("USER ID:", request.user.id)
    
    const userId = request.user.id

    const { name }= request.body as {
        name: string
    }

    const group = await prisma.group.create({
        data: 
        {
            groupName: name, 
            created_by_id: userId,
            groupMembers: {
                create: {
                    user_id: userId,
                    role: 'ADMIN'
                }
            }
        }
    })
    return reply.send(group)
}

export async function inviteToGroup(request: FastifyRequest, reply: FastifyReply){
    const userId = request.user.id
    const { email, group_id } = request.body as { email: string; group_id: number }

    const isMember = await prisma.groupMembers.findFirst({
        where:{
            group_id: group_id,
            user_id: userId
        }
    })

    if(!isMember){
        return reply.status(403).send({message: 'You are not a member of this group'})
    }

    const invitedUser = await prisma.user.findUnique({
        where: {email}
    })

    if(invitedUser){
        return reply.status(404).send({message: 'The person you are invited is not exist.'})
    }

    const alreadyMember = await prisma.groupMembers.findFirst({
        where: {
            group_id, user_id: invitedUser!.id
        }
    })

    if(alreadyMember){
        return reply.status(400).send({
            message: 'User is already a member'
        })
    }

    const newMember = await prisma.groupMembers.create({
    data: {
      group_id,
      user_id: invitedUser!.id,
      role: 'MEMBER'
    }
  })
  return reply.status(201).send({ message: 'User invited successfully', member: newMember }) // test it 
}